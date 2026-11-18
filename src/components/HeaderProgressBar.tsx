import React from "react";
import { ReflectionManuscript, countWords } from "../types/reflection";

interface HeaderProgressBarProps {
  manuscript: ReflectionManuscript;
  onSelectSection?: (sectionNum: 1 | 2 | 3) => void;
}

const SECTION_TARGETS: {
  id: 1 | 2 | 3;
  label: string;
  key: keyof Pick<ReflectionManuscript, "section1" | "section2" | "section3">;
  targetWords: number;
}[] = [
  { id: 1, label: "1. Discovery", key: "section1", targetWords: 120 },
  { id: 2, label: "2. Stage 1 vs 2", key: "section2", targetWords: 120 },
  { id: 3, label: "3. Careers", key: "section3", targetWords: 120 },
];

export const HeaderProgressBar: React.FC<HeaderProgressBarProps> = ({
  manuscript,
  onSelectSection,
}) => {
  const sections = SECTION_TARGETS.map((sec) => {
    const words = countWords(manuscript[sec.key]);
    const pct = Math.min(100, Math.round((words / sec.targetWords) * 100));
    const isComplete = words >= sec.targetWords;
    return { ...sec, words, pct, isComplete };
  });

  const completedCount = sections.filter((s) => s.isComplete).length;
  const overallPct = Math.round(
    sections.reduce((acc, s) => acc + s.pct, 0) / sections.length
  );

  return (
    <div
      className="flex items-center gap-3 shrink-0"
      aria-label={`Final reflection completion: ${completedCount} of 3 sections complete (${overallPct}%)`}
    >
      <div className="hidden xl:flex flex-col gap-1 min-w-[190px]">
        <div className="flex items-center justify-between text-[11px] font-medium text-slate-600">
          <span>Reflection Progress</span>
          <span className="font-mono-tabular text-slate-900">
            {completedCount}/3 · {overallPct}%
          </span>
        </div>
        <div className="grid grid-cols-3 gap-1">
          {sections.map((sec) => (
            <button
              key={sec.id}
              type="button"
              onClick={() => onSelectSection?.(sec.id)}
              title={`${sec.label}: ${sec.words} words (${sec.pct}%)`}
              className="group relative h-1.5 w-full rounded-full bg-slate-200 overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              <span
                className={`block h-full transition-all duration-300 ${
                  sec.isComplete ? "bg-emerald-600" : "bg-blue-600"
                }`}
                style={{ width: `${sec.pct}%` }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Compact mobile/tablet view */}
      <div className="flex xl:hidden items-center gap-1.5">
        <div className="grid grid-cols-3 gap-1 w-16">
          {sections.map((sec) => (
            <button
              key={sec.id}
              type="button"
              onClick={() => onSelectSection?.(sec.id)}
              title={`${sec.label}: ${sec.words} words`}
              className="h-1.5 w-full rounded-full bg-slate-200 overflow-hidden"
            >
              <span
                className={`block h-full ${
                  sec.isComplete ? "bg-emerald-600" : "bg-blue-600"
                }`}
                style={{ width: `${sec.pct}%` }}
              />
            </button>
          ))}
        </div>
        <span className="font-mono-tabular text-[11px] font-medium text-slate-700">
          {completedCount}/3
        </span>
      </div>
    </div>
  );
};
