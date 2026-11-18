import {
  ReflectionManuscript,
  StudentProfile,
} from "../types/reflection";

export const TRAN_HAI_YEN_PROFILE: StudentProfile = {
  studentName: "Tran Hai Yen",
  stage1Reflection:
    "In Stage 1, I listed Biology, Art, Design, Photography, and Science as my main interests. I described myself as energetic and resilient, and someone who cares about discipline, personal growth, and doing well academically.",
  mbti: {
    type: "ENFP",
    scores: {
      E: 68,
      I: 32,
      S: 28,
      N: 72,
      T: 34,
      F: 66,
      J: 36,
      P: 64,
    },
    notes:
      "ENFP (Extraverted, Intuitive, Feeling, Perceiving): enthusiastic, imaginative, open-minded, and motivated by connecting with people, creativity, and personal growth.",
  },
  holland: {
    code: "S-R-A",
    scores: {
      S: 80, // 8/10
      R: 70, // 7/10
      A: 70, // 7/10
      E: 60, // 6/10
      C: 60, // 6/10
      I: 50, // 5/10
    },
    notes:
      "SRA/SAR (Social 8/10, Realistic 7/10, Artistic 7/10; Enterprising 6/10, Conventional 6/10, Investigative 5/10).",
  },
};

export interface HollandScoreDetail {
  letter: "R" | "I" | "A" | "S" | "E" | "C";
  name: string;
  viLabel: string;
  scoreOutOf10: number;
  barColor: string;
  isTopThree: boolean;
  reflectionInsight: string;
}

export const HOLLAND_EXACT_SCORES: HollandScoreDetail[] = [
  {
    letter: "R",
    name: "Realistic",
    viLabel: "R - Kỹ Thuật",
    scoreOutOf10: 7,
    barColor: "#c94a38",
    isTopThree: true,
    reflectionInsight:
      "Tied for my second-highest score at 7/10. I like hands-on, practical tasks and solving real problems, which connects naturally to diagnosing patients or working directly in a lab.",
  },
  {
    letter: "I",
    name: "Investigative",
    viLabel: "I - Nghiên Cứu",
    scoreOutOf10: 5,
    barColor: "#ea8a54",
    isTopThree: false,
    reflectionInsight:
      "At 5/10, this reflects my curiosity in Biology, especially wanting to understand how the human body works and what causes diseases.",
  },
  {
    letter: "A",
    name: "Artistic",
    viLabel: "A - Nghệ Thuật",
    scoreOutOf10: 7,
    barColor: "#f6cb58",
    isTopThree: true,
    reflectionInsight:
      "Also tied at 7/10. This comes through in my love for design and photography. Seeing it sit right next to Realistic made me realize my creative and science interests actually go well together.",
  },
  {
    letter: "S",
    name: "Social",
    viLabel: "S - Xã Hội",
    scoreOutOf10: 8,
    barColor: "#7ad67c",
    isTopThree: true,
    reflectionInsight:
      "My highest score at 8/10. I enjoy interacting with people and helping others, which is a big part of why becoming a doctor appeals to me.",
  },
  {
    letter: "E",
    name: "Enterprising",
    viLabel: "E - Quản Lí",
    scoreOutOf10: 6,
    barColor: "#5895d6",
    isTopThree: false,
    reflectionInsight:
      "A steady 6/10, matching my energy and willingness to take initiative toward challenging academic goals.",
  },
  {
    letter: "C",
    name: "Conventional",
    viLabel: "C - Nghiệp vụ",
    scoreOutOf10: 6,
    barColor: "#8f61c9",
    isTopThree: false,
    reflectionInsight:
      "Also at 6/10, which fits the discipline and structure I rely on when working hard toward my studies.",
  },
];

export interface MbtiDimensionDetail {
  letter: "E" | "N" | "F" | "P";
  opposite: "I" | "S" | "T" | "J";
  title: string;
  subtitle: string;
  description: string;
  careerLink: string;
}

export const ENFP_DIMENSIONS: MbtiDimensionDetail[] = [
  {
    letter: "E",
    opposite: "I",
    title: "Extraverted",
    subtitle: "Energized by people",
    description:
      "I get energy from being around others and building genuine connections, which fits closely with my high Social score (8/10).",
    careerLink:
      "Helpful for talking with patients, listening well, and working in healthcare teams.",
  },
  {
    letter: "N",
    opposite: "S",
    title: "Intuitive",
    subtitle: "Curious about ideas",
    description:
      "I like exploring possibilities and asking how things work, whether that is human biology in class or a new angle in photography.",
    careerLink:
      "Fits medical research and figuring out complex biological questions.",
  },
  {
    letter: "F",
    opposite: "T",
    title: "Feeling",
    subtitle: "Guided by values",
    description:
      "I care about doing work that feels meaningful and actually helps people, not just hitting a target for its own sake.",
    careerLink:
      "Matches the supportive, human side of clinical medicine.",
  },
  {
    letter: "P",
    opposite: "J",
    title: "Perceiving",
    subtitle: "Open and adaptable",
    description:
      "I stay open to new experiences and don't feel boxed into just one lane. Science and design can both stay part of who I am.",
    careerLink:
      "Makes it easier to adapt as medicine evolves and explore both clinical work and lab research.",
  },
];

export const TRAN_HAI_YEN_MANUSCRIPT: ReflectionManuscript = {
  title: "Final Self-Discovery Reflection",
  section1: `Looking back on my self-discovery process, I have a clearer picture of my personality, interests, strengths, and where my future could go. Taking the Myers-Briggs Type Indicator (MBTI) and Holland Code (RIASEC) assessments gave me a chance to check my earlier assumptions about myself against real results.

My MBTI result came out as ENFP (Extraverted, Intuitive, Feeling, Perceiving), which describes someone who is enthusiastic, imaginative, and open-minded. I enjoy exploring new ideas, building genuine connections with people, and making space for creativity and personal growth. On the Holland Code assessment, my top result was SRA/SAR (Social, Realistic, Artistic). Social reflects how much I enjoy helping and interacting with others, Realistic points to my preference for practical, hands-on problem-solving, and Artistic shows my creative side and need for self-expression. What surprised me most was seeing these three appear together. I used to think of my science interests and my creative hobbies as completely separate, so these results helped me realize I have abilities that can actually support one another.`,

  section2: `When I compared these results with my Initial Self-Reflection from Stage 1, a lot of things lined up. Earlier, I listed Biology, Art, Design, Photography, and Science as my main interests, and described myself as energetic, resilient, and someone who values discipline, personal growth, and academic achievement. My ENFP result backed up my curiosity and openness to new experiences, while the Social and Realistic sides of my Holland Code matched my interest in science, practical problem-solving, and helping people.

At the same time, the assessments widened how I see myself. I started to see that my interests do not have to live in separate boxes and can overlap in useful ways. Overall, I agree with most of my results because they match what I actually enjoy day to day. For example, I love studying Biology because I am genuinely curious about the human body and the scientific mechanisms behind it. Alongside that, I enjoy design and photography because they give me different ways to express my ideas. I also get real satisfaction from pushing myself academically and working toward goals that matter to me.`,

  section3: `With all of this in mind, I am especially interested in exploring careers in Medicine and Biomedical Science. Becoming a doctor fits naturally with my interest in Biology, Science, and helping people. The Social side of my Holland Code connects to caring for and supporting patients, while the Realistic side fits the practical problem-solving involved in diagnosing and treating them. Being an ENFP also means my curiosity and openness to new experiences can help me keep learning and adapting as medicine changes. I am drawn to the academic challenge and lifelong learning in medicine too, because I care about personal growth and reaching my full potential. Another path I want to look into is Biomedical Science and Medical Research. Those fields would let me study complex biological processes, understand diseases, and contribute to new discoveries, which fits my love for Biology and my goal of doing meaningful work at a high academic level.

To figure out which direction suits me better, I want to get more practical exposure to both clinical medicine and biomedical research. Experiencing their day-to-day environments, responsibilities, and challenges firsthand will help me see where my strengths fit best.

Overall, this reflection has shown me that I am motivated by curiosity, steady learning, and achievement. Even though these assessments strengthened my interest in science and healthcare, I know they do not decide my future. They are simply a starting point to explore my options, build my skills, and work toward my potential.`,
};

export type MindMapGroup = "stage1" | "stage2" | "career" | "next";

export interface MindMapNode {
  id: string;
  label: string;
  sublabel: string;
  group: MindMapGroup;
  column: 0 | 1 | 2 | 3;
  row: number;
  summary: string;
  quote: string;
  connectedTo: string[];
}

export const MIND_MAP_NODES: MindMapNode[] = [
  // Column 0: Stage 1 Initial Reflection
  {
    id: "s1-bio",
    label: "Biology & Science",
    sublabel: "Stage 1 Interest",
    group: "stage1",
    column: 0,
    row: 0,
    summary: "I enjoy studying Biology because I'm curious about how the human body works and the science behind it.",
    quote: "I love studying Biology because I am genuinely curious about the human body and the scientific mechanisms behind it.",
    connectedTo: ["s2-r", "s2-enfp", "car-med", "car-bio"],
  },
  {
    id: "s1-art",
    label: "Art, Design & Photography",
    sublabel: "Stage 1 Interest",
    group: "stage1",
    column: 0,
    row: 1,
    summary: "Design and photography are how I express ideas visually. I used to keep them separate from science, until Stage 2.",
    quote: "Alongside that, I enjoy design and photography because they give me different ways to express my ideas.",
    connectedTo: ["s2-a", "s2-enfp"],
  },
  {
    id: "s1-values",
    label: "Resilience & Discipline",
    sublabel: "Stage 1 Values",
    group: "stage1",
    column: 0,
    row: 2,
    summary: "I see myself as energetic and resilient, and I care about discipline, personal growth, and academic achievement.",
    quote: "Earlier, I listed Biology, Art, Design, Photography, and Science as my main interests, and described myself as energetic, resilient, and someone who values discipline, personal growth, and academic achievement.",
    connectedTo: ["s2-enfp", "s2-s", "car-med", "car-bio"],
  },

  // Column 1: Stage 2 Assessments
  {
    id: "s2-enfp",
    label: "MBTI: ENFP",
    sublabel: "Extraverted · Intuitive · Feeling · Perceiving",
    group: "stage2",
    column: 1,
    row: 0,
    summary: "Enthusiastic, imaginative, and open-minded. I value real connections with people, creativity, and keeping on learning.",
    quote: "Being an ENFP also means my curiosity and openness to new experiences can help me keep learning and adapting as medicine changes.",
    connectedTo: ["s1-bio", "s1-art", "s1-values", "car-med", "car-bio"],
  },
  {
    id: "s2-s",
    label: "Social (8/10)",
    sublabel: "Holland #1 · S - Xã Hội",
    group: "stage2",
    column: 1,
    row: 1,
    summary: "My top Holland score. I genuinely enjoy interacting with people and helping others.",
    quote: "The Social side of my Holland Code connects to caring for and supporting patients.",
    connectedTo: ["s1-values", "car-med"],
  },
  {
    id: "s2-r",
    label: "Realistic (7/10)",
    sublabel: "Holland #2 (tied) · R - Kỹ Thuật",
    group: "stage2",
    column: 1,
    row: 2,
    summary: "Shows my preference for practical, hands-on activities and solving real-world problems.",
    quote: "The Realistic side fits the practical problem-solving involved in diagnosing and treating them.",
    connectedTo: ["s1-bio", "car-med", "car-bio"],
  },
  {
    id: "s2-a",
    label: "Artistic (7/10)",
    sublabel: "Holland #2 (tied) · A - Nghệ Thuật",
    group: "stage2",
    column: 1,
    row: 3,
    summary: "Highlights my creativity and self-expression, sitting right alongside Realistic and Social.",
    quote: "What surprised me most was seeing these three appear together. I used to think of my science interests and my creative hobbies as completely separate.",
    connectedTo: ["s1-art", "s2-enfp"],
  },

  // Column 2: Future Career Directions
  {
    id: "car-med",
    label: "Medicine (Doctor)",
    sublabel: "Career Idea 1",
    group: "career",
    column: 2,
    row: 0.5,
    summary: "Brings together my love for Biology, helping people (Social), practical diagnosis (Realistic), and lifelong learning (ENFP).",
    quote: "Becoming a doctor fits naturally with my interest in Biology, Science, and helping people.",
    connectedTo: ["s1-bio", "s1-values", "s2-enfp", "s2-s", "s2-r", "next-exp"],
  },
  {
    id: "car-bio",
    label: "Biomedical Science & Research",
    sublabel: "Career Idea 2",
    group: "career",
    column: 2,
    row: 2,
    summary: "Lets me dig into complex biological processes, understand diseases, and contribute to scientific progress.",
    quote: "Those fields would let me study complex biological processes, understand diseases, and contribute to new discoveries.",
    connectedTo: ["s1-bio", "s1-values", "s2-enfp", "s2-r", "next-exp"],
  },

  // Column 3: Next Step
  {
    id: "next-exp",
    label: "Clinical & Lab Exposure",
    sublabel: "What I Want to Explore Next",
    group: "next",
    column: 3,
    row: 1.25,
    summary: "Get hands-on exposure to both clinical medicine and biomedical research to compare their daily work and challenges.",
    quote: "To figure out which direction suits me better, I want to get more practical exposure to both clinical medicine and biomedical research.",
    connectedTo: ["car-med", "car-bio"],
  },
];
