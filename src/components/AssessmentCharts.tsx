import React, { useState } from "react";
import {
  ENFP_DIMENSIONS,
  HOLLAND_EXACT_SCORES,
  HollandScoreDetail,
  MbtiDimensionDetail,
  TRAN_HAI_YEN_PROFILE,
} from "../data/userPreset";
import { RiasecRadar } from "./RiasecRadar";
import { MbtiHollandVenn } from "./MbtiHollandVenn";

export const AssessmentCharts: React.FC = () => {
  const [chartMode, setChartMode] = useState<"bar" | "radar" | "original">("bar");
  const [selectedDim, setSelectedDim] = useState<HollandScoreDetail>(
    HOLLAND_EXACT_SCORES.find((d) => d.letter === "S") || HOLLAND_EXACT_SCORES[0]
  );
  const [selectedMbti, setSelectedMbti] = useState<MbtiDimensionDetail>(
    ENFP_DIMENSIONS[0]
  );
  const [imgError, setImgError] = useState(false);

  return (
    <div className="mx-auto max-w-[1280px] px-6 py-8 space-y-8">
      {/* Header */}
      <header className="border-b border-slate-200 pb-6 space-y-2">
        <p className="text-xs font-medium text-slate-500">
          Tran Hai Yen · My Personality &amp; Interest Profile
        </p>
        <h1 className="font-display text-3xl font-semibold text-slate-900 text-balance">
          Inside My ENFP &amp; Holland Code (SRA/SAR) Results
        </h1>
        <p className="text-sm leading-relaxed text-slate-600 max-w-2xl">
          Explore the charts and Venn overlap below to see how my curiosity for Biology, creative energy in Design and Photography, and drive to help people come together.
        </p>
      </header>

      {/* D3 Venn Diagram: MBTI (ENFP) & Holland Code (SRA/SAR) Overlap */}
      <MbtiHollandVenn />

      {/* Section A: Holland Code Interactive Chart */}
      <section className="rounded-xl border border-slate-200 bg-white p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="font-display text-xl font-semibold text-slate-900">
              Holland Code (RIASEC) · Result: SRA / SAR
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Social 8/10 · Realistic 7/10 · Artistic 7/10 · Enterprising 6/10 · Conventional 6/10 · Investigative 5/10
            </p>
          </div>

          <div className="inline-flex items-center gap-1 rounded-lg bg-slate-100 p-1 self-start shrink-0">
            <button
              type="button"
              onClick={() => setChartMode("bar")}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                chartMode === "bar"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Score Bar Chart (0–10)
            </button>
            <button
              type="button"
              onClick={() => setChartMode("radar")}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                chartMode === "radar"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Hexagonal Radar
            </button>
            <button
              type="button"
              onClick={() => setChartMode("original")}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                chartMode === "original"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Original Test Evidence
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Chart Area (7 cols) */}
          <div className="lg:col-span-7">
            {chartMode === "bar" && (
              <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-6 space-y-4">
                <div className="relative h-72 flex items-end justify-between gap-3 sm:gap-5 pt-6 pb-2 border-b border-slate-300">
                  {/* Horizontal Grid Lines (0, 2, 4, 6, 8, 10) */}
                  {[2, 4, 6, 8, 10].map((tick) => (
                    <div
                      key={tick}
                      style={{ bottom: `${(tick / 10) * 100}%` }}
                      className="pointer-events-none absolute left-0 right-0 border-t border-slate-200/80 flex items-center"
                    >
                      <span className="font-mono-tabular -translate-y-2.5 text-[10px] text-slate-400 pr-2">
                        {tick}
                      </span>
                    </div>
                  ))}

                  {HOLLAND_EXACT_SCORES.map((dim) => {
                    const isSelected = selectedDim.letter === dim.letter;
                    const heightPct = (dim.scoreOutOf10 / 10) * 100;
                    return (
                      <button
                        key={dim.letter}
                        type="button"
                        onClick={() => setSelectedDim(dim)}
                        className="relative z-10 flex-1 h-full flex flex-col justify-end items-center group focus:outline-none"
                      >
                        <span
                          className={`mb-1.5 font-mono-tabular text-xs font-semibold transition-colors ${
                            isSelected ? "text-slate-900" : "text-slate-500 group-hover:text-slate-900"
                          }`}
                        >
                          {dim.scoreOutOf10}/10
                        </span>
                        <div
                          style={{
                            height: `${heightPct}%`,
                            backgroundColor: dim.barColor,
                          }}
                          className={`w-full max-w-[54px] rounded-t-md transition-all duration-200 ${
                            isSelected
                              ? "ring-2 ring-offset-2 ring-slate-900 opacity-100"
                              : "opacity-85 group-hover:opacity-100"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>

                {/* X-Axis Labels */}
                <div className="flex justify-between gap-3 sm:gap-5 text-center">
                  {HOLLAND_EXACT_SCORES.map((dim) => {
                    const isSelected = selectedDim.letter === dim.letter;
                    return (
                      <button
                        key={dim.letter}
                        type="button"
                        onClick={() => setSelectedDim(dim)}
                        className={`flex-1 text-center transition-colors ${
                          isSelected ? "text-slate-900 font-semibold" : "text-slate-600"
                        }`}
                      >
                        <span className="block font-mono-tabular text-xs font-bold">
                          {dim.letter}
                        </span>
                        <span className="block text-[11px] truncate">
                          {dim.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {chartMode === "radar" && (
              <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-6 flex flex-col items-center justify-center min-h-[340px] space-y-4">
                <RiasecRadar
                  scores={TRAN_HAI_YEN_PROFILE.holland.scores}
                  code="S-R-A"
                  size={270}
                />
                <div className="flex flex-wrap justify-center gap-2">
                  {HOLLAND_EXACT_SCORES.map((dim) => (
                    <button
                      key={dim.letter}
                      type="button"
                      onClick={() => setSelectedDim(dim)}
                      className={`rounded-md border px-2.5 py-1 text-xs font-mono-tabular transition-colors ${
                        selectedDim.letter === dim.letter
                          ? "border-slate-900 bg-slate-900 text-white"
                          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      {dim.letter}: {dim.scoreOutOf10}/10
                    </button>
                  ))}
                </div>
              </div>
            )}

            {chartMode === "original" && (
              <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 flex flex-col items-center justify-center min-h-[340px] space-y-3">
                {!imgError ? (
                  <img
                    src="/assets/aistudio/Screenshot_2026-11-18_at_20.54.48_7adc8d8f.png"
                    alt="Original Holland Code RIASEC assessment result for Tran Hai Yen"
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className="max-h-[310px] w-auto rounded-lg border border-slate-200 bg-white object-contain"
                  />
                ) : (
                  <div className="text-center p-6 text-xs text-slate-500">
                    Verified Holland Code scores: S (8/10), R (7/10), A (7/10), E (6/10), C (6/10), I (5/10).
                  </div>
                )}
                <p className="text-xs text-slate-500">
                  Original Holland assessment screenshot for Tran Hai Yen (S = 8, R = 7, A = 7, E = 6, C = 6, I = 5)
                </p>
              </div>
            )}
          </div>

          {/* Right Selected Bar Insight Card (5 cols) */}
          <div className="lg:col-span-5 rounded-xl border border-slate-200 bg-slate-50 p-6 space-y-4">
            <div className="flex items-baseline justify-between border-b border-slate-200 pb-3">
              <div>
                <p className="text-xs font-medium text-slate-500">
                  {selectedDim.viLabel}
                </p>
                <h3 className="font-display text-2xl font-semibold text-slate-900 mt-0.5">
                  {selectedDim.name} ({selectedDim.letter})
                </h3>
              </div>
              <span className="font-mono-tabular text-2xl font-bold text-blue-600">
                {selectedDim.scoreOutOf10} / 10
              </span>
            </div>

            <p className="text-sm leading-relaxed text-slate-700">
              {selectedDim.reflectionInsight}
            </p>

            <div className="pt-2 border-t border-slate-200 space-y-1.5 text-xs text-slate-600">
              <p className="font-semibold text-slate-900">
                Why SRA / SAR?
              </p>
              <p className="leading-relaxed">
                With Social leading at 8/10 and Realistic and Artistic tied at 7/10, both SRA and SAR capture the blend of caring for people, hands-on problem solving, and visual creativity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section B: Interactive MBTI (ENFP) Explorer */}
      <section className="rounded-xl border border-slate-200 bg-white p-6 space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h2 className="font-display text-xl font-semibold text-slate-900">
            MBTI Personality Profile · Result: ENFP
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Extraverted · Intuitive · Feeling · Perceiving. Click any letter to see how it connects to my interests and future plans.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3">
            {ENFP_DIMENSIONS.map((dim) => {
              const isSelected = selectedMbti.letter === dim.letter;
              return (
                <button
                  key={dim.letter}
                  type="button"
                  onClick={() => setSelectedMbti(dim)}
                  className={`rounded-xl border p-4 text-left transition-colors ${
                    isSelected
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-slate-200 bg-slate-50 text-slate-900 hover:border-slate-300 hover:bg-white"
                  }`}
                >
                  <span
                    className={`font-mono-tabular text-2xl font-bold block ${
                      isSelected ? "text-white" : "text-blue-600"
                    }`}
                  >
                    {dim.letter}
                  </span>
                  <span className="text-sm font-semibold block mt-1">
                    {dim.title}
                  </span>
                  <span
                    className={`text-xs block mt-0.5 ${
                      isSelected ? "text-blue-100" : "text-slate-500"
                    }`}
                  >
                    vs {dim.opposite} · {dim.subtitle}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-6 rounded-xl border border-slate-200 bg-slate-50 p-6 space-y-4">
            <div className="flex items-baseline justify-between">
              <h3 className="font-display text-xl font-semibold text-slate-900">
                {selectedMbti.letter} — {selectedMbti.title}
              </h3>
              <span className="text-xs font-medium text-blue-600">
                {selectedMbti.subtitle}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-700">
              {selectedMbti.description}
            </p>
            <div className="rounded-lg border border-slate-200 bg-white p-4 space-y-1">
              <p className="text-xs font-semibold text-slate-900">
                Connection to Medicine &amp; Biomedical Science
              </p>
              <p className="text-xs leading-relaxed text-slate-600">
                {selectedMbti.careerLink}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
