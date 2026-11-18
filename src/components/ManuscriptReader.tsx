import React, { useState } from "react";
import { Printer } from "lucide-react";
import { ReflectionManuscript, StudentProfile } from "../types/reflection";

interface ManuscriptReaderProps {
  profile: StudentProfile;
  manuscript: ReflectionManuscript;
  focusedSection?: 1 | 2 | 3 | null;
}

type ThemeLens = "all" | "mbti" | "holland" | "passions" | "careers";

const LENS_PATTERNS: Record<Exclude<ThemeLens, "all">, RegExp> = {
  mbti: /(ENFP|Myers-Briggs|MBTI|Extraverted, Intuitive, Feeling, Perceiving|curiosity and openness)/gi,
  holland: /(Holland Code|RIASEC|SRA\/SAR|Social|Realistic|Artistic)/gi,
  passions: /(Biology, Art, Design, Photography, and Science|Biology|design and photography|human body|energetic, resilient|discipline|personal growth|academic achievement)/gi,
  careers: /(Medicine and Biomedical Science|Becoming a doctor|Biomedical Science and Medical Research|clinical medicine|biomedical research|diagnosing and treating)/gi,
};

function renderHighlightedText(text: string, lens: ThemeLens) {
  if (lens === "all") {
    return text;
  }
  const regex = LENS_PATTERNS[lens];
  const parts = text.split(regex);
  return parts.map((part, idx) => {
    if (idx % 2 === 1) {
      return (
        <mark
          key={idx}
          className="rounded bg-blue-100 px-1 py-0.5 text-blue-950 font-medium"
        >
          {part}
        </mark>
      );
    }
    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
}

export const ManuscriptReader: React.FC<ManuscriptReaderProps> = ({
  profile,
  manuscript,
  focusedSection,
}) => {
  const [lens, setLens] = useState<ThemeLens>("all");

  return (
    <div className="mx-auto max-w-[920px] px-6 py-8 space-y-6">
      {/* Interactive Theme Lens Toolbar */}
      <div className="no-print flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-5 py-3.5">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-medium text-slate-500 mr-1">
            Focus Theme:
          </span>
          {(
            [
              { id: "all", label: "All" },
              { id: "mbti", label: "ENFP" },
              { id: "holland", label: "SRA / SAR" },
              { id: "passions", label: "My Passions" },
              { id: "careers", label: "Future Paths" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setLens(tab.id)}
              className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                lens === tab.id
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0"
        >
          <Printer className="h-3.5 w-3.5" />
          <span>Print / Save PDF</span>
        </button>
      </div>

      {/* Personal Editorial Page */}
      <article className="print-manuscript rounded-xl border border-slate-200 bg-white p-8 sm:p-12 space-y-8">
        <header className="border-b border-slate-200 pb-6 space-y-2.5">
          <p className="text-xs font-medium text-blue-600">
            About Me · Personal Self-Discovery
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-slate-900">
            {profile.studentName}
          </h1>
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span>{manuscript.title}</span>
            <span aria-hidden="true">·</span>
            <span>MBTI: {profile.mbti.type}</span>
            <span aria-hidden="true">·</span>
            <span>Holland Code: SRA / SAR</span>
          </div>
        </header>

        {/* Personal Snapshot Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-xl border border-slate-200 bg-slate-50/80 p-5">
          <div className="space-y-1">
            <p className="font-mono-tabular text-[11px] font-semibold text-slate-500">
              What I Enjoy
            </p>
            <p className="text-xs font-semibold text-slate-900">
              Biology · Science · Design · Photography
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Energetic and resilient, with a focus on discipline, personal growth, and doing well academically.
            </p>
          </div>
          <div className="space-y-1">
            <p className="font-mono-tabular text-[11px] font-semibold text-blue-600">
              My Results
            </p>
            <p className="text-xs font-semibold text-slate-900">
              ENFP · SRA/SAR (S 8 · R 7 · A 7)
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Helping others, practical problem-solving, and creative work actually fit well together.
            </p>
          </div>
          <div className="space-y-1">
            <p className="font-mono-tabular text-[11px] font-semibold text-emerald-700">
              What&apos;s Next
            </p>
            <p className="text-xs font-semibold text-slate-900">
              Medicine · Biomedical Science
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Getting hands-on exposure to clinical medicine and biomedical research to compare both paths.
            </p>
          </div>
        </div>

        {/* Section 1 */}
        <section
          id="reflection-section-1"
          className={`space-y-3 rounded-lg transition-colors ${
            focusedSection === 1 ? "ring-2 ring-blue-200 p-3 -m-3" : ""
          }`}
        >
          <h2 className="font-display text-xl font-semibold text-slate-900 border-b border-slate-100 pb-2">
            1. What Did I Discover About Myself?
          </h2>
          <div className="text-[15px] leading-[1.8] text-slate-800 whitespace-pre-line">
            {renderHighlightedText(manuscript.section1, lens)}
          </div>
        </section>

        {/* Section 2 */}
        <section
          id="reflection-section-2"
          className={`space-y-3 rounded-lg transition-colors ${
            focusedSection === 2 ? "ring-2 ring-blue-200 p-3 -m-3" : ""
          }`}
        >
          <h2 className="font-display text-xl font-semibold text-slate-900 border-b border-slate-100 pb-2">
            2. What Has Changed (or Stayed the Same)?
          </h2>
          <div className="text-[15px] leading-[1.8] text-slate-800 whitespace-pre-line">
            {renderHighlightedText(manuscript.section2, lens)}
          </div>
        </section>

        {/* Section 3 */}
        <section
          id="reflection-section-3"
          className={`space-y-3 rounded-lg transition-colors ${
            focusedSection === 3 ? "ring-2 ring-blue-200 p-3 -m-3" : ""
          }`}
        >
          <h2 className="font-display text-xl font-semibold text-slate-900 border-b border-slate-100 pb-2">
            3. Connecting Myself to Future Careers
          </h2>
          <div className="text-[15px] leading-[1.8] text-slate-800 whitespace-pre-line">
            {renderHighlightedText(manuscript.section3, lens)}
          </div>
        </section>
      </article>
    </div>
  );
};
