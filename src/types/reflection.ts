export type MbtiLetterE = "E" | "I";
export type MbtiLetterS = "S" | "N";
export type MbtiLetterT = "T" | "F";
export type MbtiLetterJ = "J" | "P";

export type HollandDimension = "R" | "I" | "A" | "S" | "E" | "C";

export type ReflectionPhase = "discovery" | "comparison" | "careers";

export type AppView = "mindmap" | "charts" | "manuscript";

export interface MbtiScores {
  E: number;
  I: number;
  S: number;
  N: number;
  T: number;
  F: number;
  J: number;
  P: number;
}

export interface HollandScores {
  R: number;
  I: number;
  A: number;
  S: number;
  E: number;
  C: number;
}

export interface StudentProfile {
  studentName: string;
  stage1Reflection: string;
  mbti: {
    type: string;
    scores: MbtiScores;
    notes: string;
  };
  holland: {
    code: string;
    scores: HollandScores;
    notes: string;
  };
}

export interface ChatMessage {
  id: string;
  role: "coach" | "user";
  text: string;
  phase: ReflectionPhase;
  sparkPrompts?: string[];
  timestamp: number;
}

export interface CapturedInsight {
  id: string;
  phase: ReflectionPhase;
  text: string;
}

export interface ReflectionManuscript {
  title: string;
  section1: string;
  section2: string;
  section3: string;
}

export function countWords(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).filter(Boolean).length;
}
