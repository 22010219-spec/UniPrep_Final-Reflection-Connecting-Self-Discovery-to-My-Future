import { HollandDimension, MbtiScores, HollandScores } from "../types/reflection";

export interface MbtiTypeInfo {
  code: string;
  title: string;
  summary: string;
  strengths: string[];
  blindSpots: string[];
}

export const MBTI_TYPES: Record<string, MbtiTypeInfo> = {
  INTJ: {
    code: "INTJ",
    title: "Strategic Architect",
    summary:
      "Analytical, independent, and systems-oriented. Drawn to long-term patterns, conceptual mastery, and structured execution.",
    strengths: ["Systems thinking", "Long-range planning", "Independent research"],
    blindSpots: ["Impatience with unstructured routine", "Over-critiquing ideas early"],
  },
  INTP: {
    code: "INTP",
    title: "Conceptual Logician",
    summary:
      "Curious, theoretical, and inventive. Energized by deconstructing complex problems and testing underlying principles.",
    strengths: ["Abstract reasoning", "Root-cause analysis", "Original frameworks"],
    blindSpots: ["Procrastinating on routine follow-through", "Understating personal stakes"],
  },
  ENTJ: {
    code: "ENTJ",
    title: "Decisive Strategist",
    summary:
      "Direct, ambitious, and organizing. Thrives when rallying people and resources toward measurable, high-leverage goals.",
    strengths: ["Strategic leadership", "Decisive coordination", "Efficiency"],
    blindSpots: ["Moving faster than consensus allows", "Overlooking emotional nuance"],
  },
  ENTP: {
    code: "ENTP",
    title: "Inventive Debater",
    summary:
      "Quick-minded, entrepreneurial, and exploratory. Loves connecting disparate ideas and challenging conventional assumptions.",
    strengths: ["Ideation & synthesis", "Adaptive problem-solving", "Persuasion"],
    blindSpots: ["Losing interest after the blueprint phase", "Overcommitting"],
  },
  INFJ: {
    code: "INFJ",
    title: "Insightful Advocate",
    summary:
      "Purpose-driven, reflective, and perceptive about human dynamics. Seeks meaningful work that aligns with core values.",
    strengths: ["Empathic foresight", "Meaningful writing", "Values-led planning"],
    blindSpots: ["Perfectionism", "Absorbing others' stress quietly"],
  },
  INFP: {
    code: "INFP",
    title: "Reflective Idealist",
    summary:
      "Creative, authentic, and deeply guided by personal ethics. Thrives in expressive, human-centered exploration.",
    strengths: ["Storytelling & nuance", "Value alignment", "Original creativity"],
    blindSpots: ["Self-doubt under rigid critique", "Avoiding conflict"],
  },
  ENFJ: {
    code: "ENFJ",
    title: "Catalytic Mentor",
    summary:
      "Warm, articulate, and collaborative. Energized by helping others grow and uniting teams around shared purpose.",
    strengths: ["Coaching & facilitation", "Clear communication", "Team cohesion"],
    blindSpots: ["Prioritizing others' needs over own bandwidth", "Taking criticism personally"],
  },
  ENFP: {
    code: "ENFP",
    title: "Expressive Explorer",
    summary:
      "Enthusiastic, imaginative, and people-curious. Drawn to fresh possibilities, creative collaboration, and human stories.",
    strengths: ["Creative brainstorming", "Building rapport", "Adaptability"],
    blindSpots: ["Scattered focus across too many ideas", "Disliking repetitive admin"],
  },
  ISTJ: {
    code: "ISTJ",
    title: "Methodical Steward",
    summary:
      "Dependable, thorough, and evidence-grounded. Excels at turning standards, facts, and processes into reliable outcomes.",
    strengths: ["Precision & accuracy", "Follow-through", "Operational reliability"],
    blindSpots: ["Skepticism of untested leaps", "Over-relying on precedent"],
  },
  ISFJ: {
    code: "ISFJ",
    title: "Attentive Supporter",
    summary:
      "Conscientious, observant, and service-minded. Brings steadiness, practical care, and quiet diligence to teams.",
    strengths: ["Practical care", "Detail memory", "Reliable stewardship"],
    blindSpots: ["Hesitating to voice own ambitions", "Taking on silent workload"],
  },
  ESTJ: {
    code: "ESTJ",
    title: "Structured Organizer",
    summary:
      "Pragmatic, clear-spoken, and results-focused. Builds order, clear expectations, and dependable execution.",
    strengths: ["Project execution", "Clear standards", "Logistical leadership"],
    blindSpots: ["Rigidity under ambiguity", "Impatience with abstract tangents"],
  },
  ESFJ: {
    code: "ESFJ",
    title: "Collaborative Host",
    summary:
      "Warm, organized, and community-oriented. Fosters harmony, practical support, and smooth coordination.",
    strengths: ["Relationship building", "Event & team coordination", "Practical empathy"],
    blindSpots: ["Over-indexing on external approval", "Discomfort with tense debate"],
  },
  ISTP: {
    code: "ISTP",
    title: "Hands-On Troubleshooter",
    summary:
      "Calm, observant, and mechanically or technically agile. Learns best by building, testing, and fixing real systems.",
    strengths: ["Tactical problem-solving", "Crisis composure", "Technical craft"],
    blindSpots: ["Disliking rigid long-term rules", "Withholding thoughts until asked"],
  },
  ISFP: {
    code: "ISFP",
    title: "Tactile Creator",
    summary:
      "Observant, grounded, and aesthetically sensitive. Expresses values through hands-on craft, design, or direct care.",
    strengths: ["Aesthetic sensibility", "Present-moment awareness", "Authentic craft"],
    blindSpots: ["Shying away from self-promotion", "Disliking abstract bureaucracy"],
  },
  ESTP: {
    code: "ESTP",
    title: "Dynamic Pragmatist",
    summary:
      "Energetic, resourceful, and action-oriented. Reads live situations quickly and thrives in fast-moving environments.",
    strengths: ["Real-time adaptability", "Negotiation", "Action bias"],
    blindSpots: ["Impatience with slow theory", "Skipping long-range documentation"],
  },
  ESFP: {
    code: "ESFP",
    title: "Engaging Performer",
    summary:
      "Spontaneous, observant, and socially vibrant. Brings energy, warmth, and practical immediacy to people-facing work.",
    strengths: ["Live engagement", "Practical optimism", "Collaborative energy"],
    blindSpots: ["Avoiding dry long-term planning", "Overloading schedule"],
  },
};

export interface MbtiQuestion {
  id: string;
  dimension: "EI" | "SN" | "TF" | "JP";
  prompt: string;
  optionA: { label: string; pole: keyof MbtiScores };
  optionB: { label: string; pole: keyof MbtiScores };
}

export const MBTI_QUESTIONS: MbtiQuestion[] = [
  {
    id: "ei-1",
    dimension: "EI",
    prompt: "After a full day of group classes or collaboration, you usually recharge best by:",
    optionA: { label: "Talking things out with friends or joining another lively activity", pole: "E" },
    optionB: { label: "Having uninterrupted solo time to read, walk, or think quietly", pole: "I" },
  },
  {
    id: "ei-2",
    dimension: "EI",
    prompt: "When working through a tricky assignment problem, you tend to:",
    optionA: { label: "Think out loud and bounce rough ideas around with others right away", pole: "E" },
    optionB: { label: "Draft your thoughts privately first before sharing a polished view", pole: "I" },
  },
  {
    id: "ei-3",
    dimension: "EI",
    prompt: "In a new project team, you naturally gravitate toward:",
    optionA: { label: "Connecting across multiple people and energizing group momentum", pole: "E" },
    optionB: { label: "Going deep on a focused piece of the work with one or two partners", pole: "I" },
  },
  {
    id: "sn-1",
    dimension: "SN",
    prompt: "When learning a brand-new subject, what grabs your attention first?",
    optionA: { label: "Concrete examples, proven steps, and how it works in practice today", pole: "S" },
    optionB: { label: "The big-picture concept, hidden patterns, and future possibilities", pole: "N" },
  },
  {
    id: "sn-2",
    dimension: "SN",
    prompt: "Which type of praise feels most accurate to how you work?",
    optionA: { label: "You notice practical details others miss and keep things grounded", pole: "S" },
    optionB: { label: "You connect unexpected dots and reimagine how things could be", pole: "N" },
  },
  {
    id: "sn-3",
    dimension: "SN",
    prompt: "When given an open-ended prompt, you prefer:",
    optionA: { label: "Clear benchmarks and real-world precedents to build from", pole: "S" },
    optionB: { label: "Freedom to invent an original angle or theoretical framework", pole: "N" },
  },
  {
    id: "tf-1",
    dimension: "TF",
    prompt: "When making a tough career or project decision, you weigh most heavily:",
    optionA: { label: "Objective logic, trade-offs, and consistent criteria", pole: "T" },
    optionB: { label: "Personal values and how the decision affects the people involved", pole: "F" },
  },
  {
    id: "tf-2",
    dimension: "TF",
    prompt: "When giving feedback on a teammate's work, your instinct is to:",
    optionA: { label: "Point directly to flaws so the final output gets stronger", pole: "T" },
    optionB: { label: "Frame critique with encouragement to protect trust and morale", pole: "F" },
  },
  {
    id: "tf-3",
    dimension: "TF",
    prompt: "Which kind of debate feels more natural to you?",
    optionA: { label: "Testing an argument's logic even if you play devil's advocate", pole: "T" },
    optionB: { label: "Finding shared human ground and understanding why people care", pole: "F" },
  },
  {
    id: "jp-1",
    dimension: "JP",
    prompt: "With a major deadline two weeks away, your preferred rhythm is:",
    optionA: { label: "Setting milestones early and checking tasks off steadily", pole: "J" },
    optionB: { label: "Keeping options open while exploring angles, then surging near the end", pole: "P" },
  },
  {
    id: "jp-2",
    dimension: "JP",
    prompt: "Your ideal week feels best when:",
    optionA: { label: "Plans are decided ahead of time and expectations are settled", pole: "J" },
    optionB: { label: "There is room to pivot spontaneously as new interests arise", pole: "P" },
  },
  {
    id: "jp-3",
    dimension: "JP",
    prompt: "When starting a creative or research task, you usually:",
    optionA: { label: "Outline the structure first before filling in details", pole: "J" },
    optionB: { label: "Dive into curiosity and let the structure emerge as you go", pole: "P" },
  },
];

export interface HollandInfo {
  letter: HollandDimension;
  name: string;
  tagline: string;
  description: string;
  careerFields: string[];
}

export const HOLLAND_DIMENSIONS: Record<HollandDimension, HollandInfo> = {
  R: {
    letter: "R",
    name: "Realistic",
    tagline: "Hands-on, tangible & technical",
    description:
      "Drawn to working with tools, machines, physical environments, engineering systems, or tangible outdoor/lab craft.",
    careerFields: [
      "Mechanical & Robotics Engineering",
      "Architecture & Industrial Design",
      "Environmental Field Science",
    ],
  },
  I: {
    letter: "I",
    name: "Investigative",
    tagline: "Analytical, curious & research-driven",
    description:
      "Energized by observing, analyzing data, solving abstract puzzles, and uncovering how complex systems work.",
    careerFields: [
      "Data Science & AI Research",
      "Biomedical / Health Sciences",
      "Policy & Economic Analysis",
    ],
  },
  A: {
    letter: "A",
    name: "Artistic",
    tagline: "Expressive, original & design-oriented",
    description:
      "Thrives in open-ended creation—visual design, storytelling, media, UX, music, or shaping original concepts.",
    careerFields: [
      "UX / Product Design",
      "Editorial Media & Communications",
      "Brand Strategy & Creative Direction",
    ],
  },
  S: {
    letter: "S",
    name: "Social",
    tagline: "Empathetic, collaborative & people-focused",
    description:
      "Motivated by teaching, mentoring, counseling, healthcare, community impact, and helping others thrive.",
    careerFields: [
      "Education & Learning Design",
      "Counseling, Psychology & Healthcare",
      "Nonprofit & Community Leadership",
    ],
  },
  E: {
    letter: "E",
    name: "Enterprising",
    tagline: "Persuasive, strategic & leadership-oriented",
    description:
      "Drawn to pitching ideas, leading initiatives, entrepreneurship, management, and driving measurable outcomes.",
    careerFields: [
      "Product Management & Startups",
      "Management Consulting",
      "Law, Advocacy & Business Strategy",
    ],
  },
  C: {
    letter: "C",
    name: "Conventional",
    tagline: "Structured, detail-accurate & systematic",
    description:
      "Excels at organizing information, financial modeling, compliance, operations, and bringing clarity to complex workflows.",
    careerFields: [
      "Financial Analysis & FinTech",
      "Operations & Project Management",
      "Information Systems & Auditing",
    ],
  },
};

export interface HollandQuestion {
  id: string;
  dimension: HollandDimension;
  activity: string;
}

export const HOLLAND_QUESTIONS: HollandQuestion[] = [
  { id: "r1", dimension: "R", activity: "Build, assemble, or troubleshoot physical hardware, prototypes, or equipment" },
  { id: "r2", dimension: "R", activity: "Work outdoors or in a hands-on lab/studio producing tangible results" },
  { id: "r3", dimension: "R", activity: "Operate technical instruments or precision tools to test how something performs" },

  { id: "i1", dimension: "I", activity: "Analyze datasets or research papers to uncover why a pattern happens" },
  { id: "i2", dimension: "I", activity: "Design experiments or build logical models to test a hypothesis" },
  { id: "i3", dimension: "I", activity: "Dive deep into complex scientific, technical, or theoretical questions" },

  { id: "a1", dimension: "A", activity: "Design visual interfaces, graphics, spaces, or multimedia stories from scratch" },
  { id: "a2", dimension: "A", activity: "Write essays, scripts, or creative pieces with a distinctive voice" },
  { id: "a3", dimension: "A", activity: "Brainstorm unconventional concepts where there is no single right answer" },

  { id: "s1", dimension: "S", activity: "Mentor, tutor, or coach peers through challenging concepts or personal decisions" },
  { id: "s2", dimension: "S", activity: "Facilitate group workshops or mediate conversations to support team wellbeing" },
  { id: "s3", dimension: "S", activity: "Work directly with communities or clients to improve health, learning, or access" },

  { id: "e1", dimension: "E", activity: "Pitch a new project or venture idea and persuade stakeholders to back it" },
  { id: "e2", dimension: "E", activity: "Lead a team, delegate roles, and drive a deadline-bound initiative to launch" },
  { id: "e3", dimension: "E", activity: "Negotiate partnerships, growth strategies, or competitive market decisions" },

  { id: "c1", dimension: "C", activity: "Organize schedules, budgets, or databases so nothing slips through the cracks" },
  { id: "c2", dimension: "C", activity: "Audit records, spot inconsistencies, and refine clear standard procedures" },
  { id: "c3", dimension: "C", activity: "Use structured spreadsheets or project trackers to keep operations accurate" },
];

export const STAGE1_STARTERS = [
  {
    label: "Analytical → People-Curious",
    text: "In Stage 1, I saw myself mainly as a quiet, analytical student who preferred working alone on technical tasks. I assumed I would end up in a purely back-office coding or lab role, and I wasn't sure whether creative or people-facing work suited me.",
  },
  {
    label: "Creative → Structure-Seeking",
    text: "In Stage 1, I described myself as creative and spontaneous, mostly drawn to writing and visual projects. I thought I disliked structured planning or data-heavy fields, and my early career ideas leaned loosely toward media or communications.",
  },
  {
    label: "Helper → Exploring Options",
    text: "In Stage 1, I knew I cared deeply about helping people and working in supportive teams, so I initially assumed teaching or healthcare were my only options. I wasn't sure what specific strengths set me apart or how my problem-solving style fits different careers.",
  },
];

export function computeMbtiFromAnswers(
  answers: Record<string, keyof MbtiScores>
): { type: string; scores: MbtiScores } {
  const counts: MbtiScores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  for (const q of MBTI_QUESTIONS) {
    const pick = answers[q.id];
    if (pick) counts[pick] += 1;
  }

  const pairPct = (a: number, b: number): [number, number] => {
    const total = a + b;
    if (total === 0) return [50, 50];
    const pctA = Math.round((a / total) * 100);
    return [pctA, 100 - pctA];
  };

  const [E, I] = pairPct(counts.E, counts.I);
  const [S, N] = pairPct(counts.S, counts.N);
  const [T, F] = pairPct(counts.T, counts.F);
  const [J, P] = pairPct(counts.J, counts.P);

  // Tie-break gently toward I, N, F, P if equal, or E/S/T/J if >= 50
  const type = [
    counts.E >= counts.I ? "E" : "I",
    counts.S >= counts.N ? "S" : "N",
    counts.T >= counts.F ? "T" : "F",
    counts.J >= counts.P ? "J" : "P",
  ].join("");

  return {
    type,
    scores: { E, I, S, N, T, F, J, P },
  };
}

export function computeHollandCodeFromScores(scores: HollandScores): string {
  return (Object.entries(scores) as [HollandDimension, number][])
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([k]) => k)
    .join("-");
}

export function getCareerIntersections(mbtiType: string, hollandCode: string): {
  title: string;
  rationale: string;
}[] {
  const letters = hollandCode.split("-") as HollandDimension[];
  const primary = letters[0] || "I";
  const secondary = letters[1] || "A";
  const isN = mbtiType.includes("N");
  const isT = mbtiType.includes("T");
  const isE = mbtiType.includes("E");

  const suggestions: { title: string; rationale: string }[] = [];

  if (letters.includes("S") && letters.includes("R") && letters.includes("A")) {
    suggestions.push({
      title: "Clinical Medicine (Physician / Doctor)",
      rationale: `Combines Social patient care and empathy with Realistic hands-on diagnosis/treatment${isN ? " and ENFP adaptability for lifelong medical learning" : ""}.`,
    });
    suggestions.push({
      title: "Biomedical Science & Medical Research",
      rationale: `Channels scientific curiosity about human biology and Realistic lab problem-solving into understanding diseases and advancing healthcare.`,
    });
    suggestions.push({
      title: "Medical Visualization & Human-Centered Health Design",
      rationale: `Unites Artistic design/photography skills with biological science and Social impact to make medical education and tools clearer.`,
    });
  }

  if (letters.includes("I") && letters.includes("A")) {
    suggestions.push({
      title: "UX Researcher / Human-Centered Product Designer",
      rationale: `Blends Investigative curiosity with Artistic synthesis${isN ? " and intuitive pattern-spotting" : " and grounded usability detail"}.`,
    });
  }
  if (letters.includes("I") && letters.includes("S")) {
    suggestions.push({
      title: "Health Informatics / Behavioral Research Specialist",
      rationale: `Connects Investigative evidence-gathering with Social impact—ideal if you enjoy translating complex insights for people.`,
    });
  }
  if (letters.includes("I") && letters.includes("C")) {
    suggestions.push({
      title: "Data & Decision Analyst / Systems Strategist",
      rationale: `Combines Investigative inquiry with Conventional precision${isT ? " and objective logical evaluation" : " to create reliable, human-aware systems"}.`,
    });
  }
  if (letters.includes("A") && letters.includes("S")) {
    suggestions.push({
      title: "Learning Experience Designer / Creative Communications",
      rationale: `Pairs Artistic storytelling with Social empathy to craft workshops, curricula, or campaigns that resonate.`,
    });
  }
  if (letters.includes("E") && (letters.includes("I") || letters.includes("A"))) {
    suggestions.push({
      title: "Product Manager / Venture Strategist",
      rationale: `Unites Enterprising initiative with ${primary === "I" ? "Investigative problem framing" : "Artistic vision"}${isE ? " and energizing cross-functional collaboration" : " and thoughtful strategic depth"}.`,
    });
  }
  if (letters.includes("S") && letters.includes("E")) {
    suggestions.push({
      title: "Organizational Development / People & Culture Lead",
      rationale: `Channels Social awareness and Enterprising leadership into coaching teams and shaping workplace programs.`,
    });
  }
  if (letters.includes("R") && letters.includes("I")) {
    suggestions.push({
      title: "Applied Robotics / Environmental Systems Engineer",
      rationale: `Grounds Investigative theory in Realistic hands-on prototyping and real-world physical testing.`,
    });
  }

  if (suggestions.length < 2) {
    const primaryInfo = HOLLAND_DIMENSIONS[primary];
    const secondaryInfo = HOLLAND_DIMENSIONS[secondary];
    suggestions.push({
      title: primaryInfo.careerFields[0],
      rationale: `Directly anchors your top ${primaryInfo.name} (${primary}) interest alongside ${mbtiType} strengths.`,
    });
    suggestions.push({
      title: secondaryInfo.careerFields[0],
      rationale: `Bridges your secondary ${secondaryInfo.name} (${secondary}) drive with your personal working style.`,
    });
  }

  return suggestions.slice(0, 3);
}
