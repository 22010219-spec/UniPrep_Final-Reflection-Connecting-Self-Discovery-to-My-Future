import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

type VennZone = "enfp" | "overlap" | "holland";

interface ZoneDetail {
  id: VennZone;
  title: string;
  subtitle: string;
  summary: string;
  highlights: string[];
  connectionNote: string;
}

const ZONE_DETAILS: Record<VennZone, ZoneDetail> = {
  enfp: {
    id: "enfp",
    title: "MBTI · ENFP Personality",
    subtitle: "Extraverted · Intuitive · Feeling · Perceiving",
    summary:
      "My ENFP side reflects how I naturally approach life and learning: energetic, imaginative, open to new ideas, and motivated by connecting with others and growing as a person.",
    highlights: [
      "Curious and open to new experiences",
      "Imaginative when exploring new ideas",
      "Values genuine connections with people",
      "Adaptable and eager to keep learning",
    ],
    connectionNote:
      "In a medical or research setting, this curiosity helps me keep up with new discoveries and connect well with people.",
  },
  overlap: {
    id: "overlap",
    title: "Where ENFP & SRA/SAR Meet",
    subtitle: "How Personality and Interests Fit Together",
    summary:
      "This overlap is where everything clicks: caring about people (Social 8/10 + Feeling), solving practical problems (Realistic 7/10), and expressing ideas creatively (Artistic 7/10 + Intuitive).",
    highlights: [
      "Curiosity about the human body + hands-on problem-solving",
      "Helping people directly + genuine empathy",
      "Design and photography alongside science",
      "Medicine and Biomedical Research as strong fits",
    ],
    connectionNote:
      "What surprised me most is that my science interests and creative hobbies do not have to stay separate. They actually support each other.",
  },
  holland: {
    id: "holland",
    title: "Holland Code · SRA/SAR",
    subtitle: "Social (8/10) · Realistic (7/10) · Artistic (7/10)",
    summary:
      "My Holland Code shows the kinds of activities I enjoy most: working closely with people, tackling practical real-world tasks, and having room for creativity.",
    highlights: [
      "Social (8/10): Helping, supporting, and interacting with others",
      "Realistic (7/10): Practical activities and real-world problem-solving",
      "Artistic (7/10): Design, photography, and self-expression",
      "Steady E (6/10), C (6/10), and I (5/10) backing discipline and inquiry",
    ],
    connectionNote:
      "Turns broad curiosity into real action, whether that means treating patients or working in a research lab.",
  },
};

export const MbtiHollandVenn: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [activeZone, setActiveZone] = useState<VennZone>("overlap");

  useEffect(() => {
    const svgEl = svgRef.current;
    if (!svgEl) return;

    const width = 560;
    const height = 340;
    const r = 118;
    const cx1 = 212;
    const cx2 = 348;
    const cy = 166;

    // Exact lens intersection geometry for two equal-radius circles
    const d = cx2 - cx1;
    const xMid = (cx1 + cx2) / 2;
    const h = Math.sqrt(r * r - (d / 2) * (d / 2));
    const yTop = cy - h;
    const yBottom = cy + h;

    const lensPath = d3.path();
    lensPath.moveTo(xMid, yTop);
    lensPath.arc(cx1, cy, r, -Math.atan2(h, d / 2), Math.atan2(h, d / 2), false);
    lensPath.arc(cx2, cy, r, Math.PI - Math.atan2(h, d / 2), Math.PI + Math.atan2(h, d / 2), false);
    lensPath.closePath();

    const svg = d3.select(svgEl);
    svg.selectAll("*").remove();

    svg.attr("viewBox", `0 0 ${width} ${height}`);

    const g = svg.append("g");

    // Left Circle: ENFP
    const enfpCircle = g
      .append("circle")
      .attr("cx", cx1)
      .attr("cy", cy)
      .attr("r", r)
      .attr("fill", "#2563eb")
      .attr("fill-opacity", activeZone === "enfp" ? 0.24 : 0.1)
      .attr("stroke", "#2563eb")
      .attr("stroke-width", activeZone === "enfp" ? 2.5 : 1.5)
      .style("cursor", "pointer")
      .on("click", () => setActiveZone("enfp"))
      .on("mouseenter", function () {
        d3.select(this).transition().duration(150).attr("fill-opacity", 0.24);
      })
      .on("mouseleave", function () {
        d3.select(this)
          .transition()
          .duration(150)
          .attr("fill-opacity", activeZone === "enfp" ? 0.24 : 0.1);
      });

    // Right Circle: Holland Code SRA/SAR
    const hollandCircle = g
      .append("circle")
      .attr("cx", cx2)
      .attr("cy", cy)
      .attr("r", r)
      .attr("fill", "#059669")
      .attr("fill-opacity", activeZone === "holland" ? 0.24 : 0.1)
      .attr("stroke", "#059669")
      .attr("stroke-width", activeZone === "holland" ? 2.5 : 1.5)
      .style("cursor", "pointer")
      .on("click", () => setActiveZone("holland"))
      .on("mouseenter", function () {
        d3.select(this).transition().duration(150).attr("fill-opacity", 0.24);
      })
      .on("mouseleave", function () {
        d3.select(this)
          .transition()
          .duration(150)
          .attr("fill-opacity", activeZone === "holland" ? 0.24 : 0.1);
      });

    // Intersection Lens Path
    const overlapPath = g
      .append("path")
      .attr("d", lensPath.toString())
      .attr("fill", "#4f46e5")
      .attr("fill-opacity", activeZone === "overlap" ? 0.28 : 0.1)
      .attr("stroke", activeZone === "overlap" ? "#312e81" : "#6366f1")
      .attr("stroke-width", activeZone === "overlap" ? 2.5 : 1.25)
      .style("cursor", "pointer")
      .on("click", () => setActiveZone("overlap"))
      .on("mouseenter", function () {
        d3.select(this).transition().duration(150).attr("fill-opacity", 0.32);
      })
      .on("mouseleave", function () {
        d3.select(this)
          .transition()
          .duration(150)
          .attr("fill-opacity", activeZone === "overlap" ? 0.28 : 0.1);
      });

    // Keep references accessible for clean state
    void enfpCircle;
    void hollandCircle;
    void overlapPath;

    // Labels: Left (ENFP)
    g.append("text")
      .attr("x", cx1 - 46)
      .attr("y", cy - 42)
      .attr("text-anchor", "middle")
      .attr("fill", "#1e3a8a")
      .attr("font-size", "14px")
      .attr("font-weight", "700")
      .style("pointer-events", "none")
      .text("MBTI: ENFP");

    const enfpTraits = ["Extraverted (E)", "Intuitive (N)", "Feeling (F)", "Perceiving (P)"];
    enfpTraits.forEach((trait, idx) => {
      g.append("text")
        .attr("x", cx1 - 48)
        .attr("y", cy - 12 + idx * 20)
        .attr("text-anchor", "middle")
        .attr("fill", "#334155")
        .attr("font-size", "11px")
        .style("pointer-events", "none")
        .text(trait);
    });

    // Labels: Right (Holland SRA/SAR)
    g.append("text")
      .attr("x", cx2 + 46)
      .attr("y", cy - 42)
      .attr("text-anchor", "middle")
      .attr("fill", "#065f46")
      .attr("font-size", "14px")
      .attr("font-weight", "700")
      .style("pointer-events", "none")
      .text("SRA / SAR");

    const hollandTraits = ["Social (8/10)", "Realistic (7/10)", "Artistic (7/10)", "Practical + Creative"];
    hollandTraits.forEach((trait, idx) => {
      g.append("text")
        .attr("x", cx2 + 48)
        .attr("y", cy - 12 + idx * 20)
        .attr("text-anchor", "middle")
        .attr("fill", "#334155")
        .attr("font-size", "11px")
        .style("pointer-events", "none")
        .text(trait);
    });

    // Labels: Center Overlap
    g.append("text")
      .attr("x", xMid)
      .attr("y", cy - 26)
      .attr("text-anchor", "middle")
      .attr("fill", "#1e1b4b")
      .attr("font-size", "12px")
      .attr("font-weight", "700")
      .style("pointer-events", "none")
      .text("Overlap");

    const overlapLines = ["Empathy + Care", "Biology + Inquiry", "Design + Creativity", "Medicine & Research"];
    overlapLines.forEach((line, idx) => {
      g.append("text")
        .attr("x", xMid)
        .attr("y", cy - 2 + idx * 18)
        .attr("text-anchor", "middle")
        .attr("fill", "#312e81")
        .attr("font-size", "10.5px")
        .attr("font-weight", "500")
        .style("pointer-events", "none")
        .text(line);
    });

    // Top captions
    g.append("text")
      .attr("x", cx1 - 24)
      .attr("y", 28)
      .attr("text-anchor", "middle")
      .attr("fill", "#64748b")
      .attr("font-size", "11px")
      .text("Personality & Mindset");

    g.append("text")
      .attr("x", cx2 + 24)
      .attr("y", 28)
      .attr("text-anchor", "middle")
      .attr("fill", "#64748b")
      .attr("font-size", "11px")
      .text("Interests & Environment");
  }, [activeZone]);

  const detail = ZONE_DETAILS[activeZone];

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h2 className="font-display text-xl font-semibold text-slate-900">
            How My ENFP Traits &amp; SRA/SAR Interests Overlap
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Click any region of the D3 Venn diagram to explore how personality and interests connect
          </p>
        </div>

        <div className="inline-flex items-center gap-1 rounded-lg bg-slate-100 p-1 self-start shrink-0">
          {(
            [
              { id: "enfp", label: "ENFP" },
              { id: "overlap", label: "Overlap" },
              { id: "holland", label: "SRA / SAR" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveZone(tab.id)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                activeZone === tab.id
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 rounded-xl border border-slate-200 bg-slate-50/70 p-4 flex items-center justify-center">
          <svg
            ref={svgRef}
            role="img"
            aria-label="D3 Venn diagram showing overlap between MBTI ENFP traits and Holland Code SRA/SAR interests"
            className="w-full max-w-[560px] h-auto select-none"
          />
        </div>

        <div className="lg:col-span-5 rounded-xl border border-slate-200 bg-slate-50 p-6 space-y-4">
          <div className="border-b border-slate-200 pb-3">
            <p className="text-xs font-medium text-blue-600">{detail.subtitle}</p>
            <h3 className="font-display text-xl font-semibold text-slate-900 mt-0.5">
              {detail.title}
            </h3>
          </div>

          <p className="text-sm leading-relaxed text-slate-700">{detail.summary}</p>

          <ul className="space-y-1.5 text-xs text-slate-700">
            {detail.highlights.map((item) => (
              <li key={item} className="leading-relaxed">
                · {item}
              </li>
            ))}
          </ul>

          <div className="border-t border-slate-200 pt-3 text-xs leading-relaxed text-slate-600">
            {detail.connectionNote}
          </div>
        </div>
      </div>
    </section>
  );
};
