import "dotenv/config";
import express, { Request, Response } from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI, ThinkingLevel, Type } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;

function getAiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY is not configured. Please check Settings > Secrets in AI Studio."
    );
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

interface AssessmentContext {
  studentName?: string;
  stage1Reflection: string;
  mbti: {
    type: string;
    scores: {
      E: number;
      I: number;
      S: number;
      N: number;
      T: number;
      F: number;
      J: number;
      P: number;
    };
    notes: string;
  };
  holland: {
    code: string;
    scores: {
      R: number;
      I: number;
      A: number;
      S: number;
      E: number;
      C: number;
    };
    notes: string;
  };
}

interface ChatMessageInput {
  role: "coach" | "user";
  text: string;
  phase?: string;
}

function formatProfileContext(profile: AssessmentContext): string {
  const { mbti, holland, stage1Reflection, studentName } = profile;
  const mbtiDimensions = [
    `E ${mbti.scores.E}% / I ${mbti.scores.I}%`,
    `S ${mbti.scores.S}% / N ${mbti.scores.N}%`,
    `T ${mbti.scores.T}% / F ${mbti.scores.F}%`,
    `J ${mbti.scores.J}% / P ${mbti.scores.P}%`,
  ].join(" | ");

  const hollandBreakdown = Object.entries(holland.scores)
    .sort(([, a], [, b]) => b - a)
    .map(([k, v]) => `${k}: ${v}/100`)
    .join(", ");

  return [
    studentName ? `Student Name: ${studentName}` : null,
    `Stage 2 Assessment 1 — MBTI Type: ${mbti.type} (${mbtiDimensions})`,
    mbti.notes ? `Student's MBTI initial note: "${mbti.notes}"` : null,
    `Stage 2 Assessment 2 — Holland Code (RIASEC): ${holland.code} (${hollandBreakdown})`,
    holland.notes ? `Student's Holland Code initial note: "${holland.notes}"` : null,
    stage1Reflection.trim()
      ? `Stage 1 Initial Self-Reflection: "${stage1Reflection.trim()}"`
      : `Stage 1 Initial Self-Reflection: (Not yet entered by the student — ask about what they initially thought about themselves before Stage 2 if relevant.)`,
  ]
    .filter(Boolean)
    .join("\n");
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: "2mb" }));

  app.get("/api/health", (_req: Request, res: Response) => {
    res.json({ ok: true });
  });

  app.post("/api/chat", async (req: Request, res: Response) => {
    try {
      const {
        profile,
        messages,
        activePhase,
      }: {
        profile: AssessmentContext;
        messages: ChatMessageInput[];
        activePhase: "discovery" | "comparison" | "careers";
      } = req.body;

      if (!profile || !profile.mbti?.type || !profile.holland?.code) {
        res.status(400).json({
          error: "Please set your MBTI type and Holland Code before starting the chat.",
        });
        return;
      }

      const ai = getAiClient();

      const phaseGuidance: Record<string, string> = {
        discovery: `Current Focus — Area 1: "What Did I Discover About Myself?"
Goal: Help the student reflect on their Stage 2 MBTI (${profile.mbti.type}) and Holland Code (${profile.holland.code}) results. Probe what key traits stood out, what surprised them, and why those insights resonate or feel unexpected.`,
        comparison: `Current Focus — Area 2: "What Has Changed (or Stayed the Same)?"
Goal: Help the student compare their Stage 1 Initial Self-Reflection with their Stage 2 MBTI and Holland Code findings. Ask what confirmed or challenged their initial assumptions, whether they agree with the results, and ask for a specific real-life example (coursework, club, part-time work, team project) as evidence.`,
        careers: `Current Focus — Area 3: "Connecting Myself to Future Careers"
Goal: Help the student identify 1–2 concrete career fields or occupations that connect their MBTI cognitive preferences and Holland Code interests, explain WHY those paths suit them using assessment evidence and personal experiences, and define ONE specific thing they want to explore or develop next. Remind them subtly when helpful that assessments guide exploration rather than locking them into a final decision.`,
      };

      const systemInstruction = `You are a thoughtful academic & career reflection coach guiding a student through their Final Reflection assignment.

STUDENT PROFILE:
${formatProfileContext(profile)}

ASSIGNMENT STRUCTURE:
1. What Did I Discover About Myself? (Connect MBTI + Holland Code results, key learnings, surprises)
2. What Has Changed (or Stayed the Same)? (Compare Stage 1 Initial Self-Reflection vs Stage 2 results, similarities/differences, confirm or challenge, agreement backed by personal examples)
3. Connecting Myself to Future Careers (1-2 aligned career possibilities, why they fit based on assessments + experiences, 1 concrete area to explore or develop further)
Reminder: Assessments do not determine a student's future career; they are tools for self-understanding and exploration.

${phaseGuidance[activePhase] || phaseGuidance.discovery}

CONVERSATION RULES:
- Keep your response warm, crisp, and focused (2–4 sentences max before your question).
- Reference specific letters or scores from their actual MBTI (${profile.mbti.type}) and Holland Code (${profile.holland.code}), or their Stage 1 reflection when relevant.
- Ask EXACTLY ONE clear, open-ended follow-up question per turn so the student is never overwhelmed.
- Never write their entire essay in chat; help them uncover their own authentic thoughts and concrete real-life examples.
- Provide 3 short, natural first-person "sparkPrompts" (under 14 words each) representing distinct honest ways the student might reply to your question (e.g., agreeing, feeling surprised, or sharing an example).
- Provide "capturedInsight": a concise 1-sentence summary of the student's latest message (or "" if this is the opening turn with no user message yet).
- Provide "suggestedPhase": keep the current activePhase unless the student has thoroughly answered this area and naturally bridged into the next one.`;

      const transcript =
        messages && messages.length > 0
          ? messages
              .map(
                (m) =>
                  `${m.role === "coach" ? "Coach" : "Student"}: ${m.text}`
              )
              .join("\n\n")
          : "(Opening turn — greet the student briefly by referencing their MBTI and Holland Code results, and ask your first focused follow-up question for the current focus area.)";

      const response = await ai.models.generateContent({
        model: "gemini-4-hydrogen",
        contents: `Conversation so far:\n${transcript}\n\nRespond as the Coach with JSON matching the schema.`,
        config: {
          systemInstruction,
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              reply: {
                type: Type.STRING,
                description:
                  "Concise, encouraging response acknowledging the student's input and ending with exactly one thoughtful follow-up question.",
              },
              sparkPrompts: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description:
                  "2 to 3 short first-person starter sentences (max 14 words each) the student can click to begin answering.",
              },
              suggestedPhase: {
                type: Type.STRING,
                description:
                  "One of: discovery, comparison, careers",
              },
              capturedInsight: {
                type: Type.STRING,
                description:
                  "1-sentence summary of the key personal insight from the student's latest message, or empty string on opening turn.",
              },
            },
            required: ["reply", "sparkPrompts", "suggestedPhase", "capturedInsight"],
          },
        },
      });

      const rawText = (response.text ?? "{}").trim();
      const parsed = JSON.parse(rawText);
      res.json(parsed);
    } catch (err: unknown) {
      console.error("Error in /api/chat:", err);
      const message =
        err instanceof Error ? err.message : "Failed to generate coach response.";
      res.status(500).json({ error: message });
    }
  });

  app.post("/api/synthesize", async (req: Request, res: Response) => {
    try {
      const {
        profile,
        messages,
        existingDraft,
        mode,
      }: {
        profile: AssessmentContext;
        messages: ChatMessageInput[];
        existingDraft?: {
          section1: string;
          section2: string;
          section3: string;
        };
        mode?: "draft" | "tighten";
      } = req.body;

      if (!profile) {
        res.status(400).json({ error: "Assessment profile is required." });
        return;
      }

      const ai = getAiClient();

      const transcript =
        messages && messages.length > 0
          ? messages
              .map(
                (m) =>
                  `${m.role === "coach" ? "Coach" : "Student"}: ${m.text}`
              )
              .join("\n\n")
          : "No chat conversation recorded yet.";

      const actionInstruction =
        mode === "tighten"
          ? `Tighten and polish the student's existing reflection draft so the combined total across all three sections is strictly between 650 and 920 words (well under the 1,000-word maximum), preserving all specific MBTI/Holland Code evidence, Stage 1 comparisons, career choices, personal examples, and key takeaways.`
          : `Synthesize the student's Stage 1 reflection, Stage 2 MBTI and Holland Code results, existing draft points, and everything newly shared in the chat conversation into a cohesive, authentic first-person Final Reflection across the three required sections. Preserve important specific details already in their existing draft while enriching them with new insights from the chat.`;

      const systemInstruction = `You are helping a student assemble their Final Reflection essay in their own authentic first-person voice ("I").

STUDENT PROFILE:
${formatProfileContext(profile)}

EXISTING DRAFT (if any):
Section 1: ${existingDraft?.section1 || "(empty)"}
Section 2: ${existingDraft?.section2 || "(empty)"}
Section 3: ${existingDraft?.section3 || "(empty)"}

TASK:
${actionInstruction}

STRICT REQUIREMENTS:
1. Write in natural, reflective first-person student prose ("I"), NOT robotic or overly formal AI clichés.
2. NEVER invent fake personal experiences, fake classes, or fake jobs that the student did not mention. If the student has not yet shared a concrete personal example in chat for a required prompt, weave what they have shared and insert a clean inline prompt like [Insert a personal example from class, a project, or work here] so they know exactly where to personalize it.
3. Explicitly reference BOTH Stage 2 assessments: their MBTI type (${profile.mbti.type}) and their Holland Code (${profile.holland.code}).
4. Total combined word count across section1 + section2 + section3 MUST be under 1,000 words (target ~650–880 words total, roughly 220–300 words per section).
5. Section 1 ("What Did I Discover About Myself?"): Key MBTI & Holland Code results, what they learned about themselves, and what surprised them or stood out most and why.
6. Section 2 ("What Has Changed (or Stayed the Same)?"): Compare Stage 1 Initial Self-Reflection with Stage 2 results, similarities/differences, whether results confirmed or challenged their initial view, and whether they agree using real examples.
7. Section 3 ("Connecting Myself to Future Careers"): 1–2 aligned career fields or occupations, why they suit the student (tying MBTI + Holland Code + experiences), and 1 specific thing to explore or develop further, keeping in mind assessments guide rather than dictate the future.`;

      const response = await ai.models.generateContent({
        model: "gemini-4-hydrogen",
        contents: `Chat Conversation Transcript:\n${transcript}\n\nGenerate the 3 reflection sections in JSON.`,
        config: {
          systemInstruction,
          thinkingConfig: { thinkingLevel: ThinkingLevel.MEDIUM },
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              section1: {
                type: Type.STRING,
                description:
                  "First-person prose for Section 1: What Did I Discover About Myself? (no section header inside text).",
              },
              section2: {
                type: Type.STRING,
                description:
                  "First-person prose for Section 2: What Has Changed (or Stayed the Same)? (no section header inside text).",
              },
              section3: {
                type: Type.STRING,
                description:
                  "First-person prose for Section 3: Connecting Myself to Future Careers (no section header inside text).",
              },
            },
            required: ["section1", "section2", "section3"],
          },
        },
      });

      const rawText = (response.text ?? "{}").trim();
      const parsed = JSON.parse(rawText);
      res.json(parsed);
    } catch (err: unknown) {
      console.error("Error in /api/synthesize:", err);
      const message =
        err instanceof Error ? err.message : "Failed to synthesize reflection draft.";
      res.status(500).json({ error: message });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
