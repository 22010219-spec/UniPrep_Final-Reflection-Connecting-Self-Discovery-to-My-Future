import React from "react";
import { HollandDimension, HollandScores } from "../types/reflection";
import { HOLLAND_DIMENSIONS } from "../data/assessments";

interface RiasecRadarProps {
  scores: HollandScores;
  code: string;
  size?: number;
}

const ORDER: HollandDimension[] = ["R", "I", "A", "S", "E", "C"];

export const RiasecRadar: React.FC<RiasecRadarProps> = ({
  scores,
  code,
  size = 240,
}) => {
  const center = size / 2;
  const radius = size * 0.34;
  const topThree = new Set(code.split("-"));

  const getPoint = (index: number, valuePct: number) => {
    const angle = (Math.PI * 2 * index) / ORDER.length - Math.PI / 2;
    const r = (radius * Math.max(8, valuePct)) / 100;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const ringLevels = [25, 50, 75, 100];

  const dataPoints = ORDER.map((dim, idx) => getPoint(idx, scores[dim]));
  const polygonPath = dataPoints
    .map((p, idx) => `${idx === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ") + " Z";

  return (
    <div className="flex flex-col items-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label={`Holland Code RIASEC radar chart showing code ${code}`}
        className="overflow-visible select-none"
      >
        {ringLevels.map((lvl) => {
          const pts = ORDER.map((_, idx) => getPoint(idx, lvl))
            .map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`)
            .join(" ");
          return (
            <polygon
              key={lvl}
              points={pts}
              fill="none"
              stroke="#e2e8f0"
              strokeWidth={1}
            />
          );
        })}

        {ORDER.map((dim, idx) => {
          const outer = getPoint(idx, 100);
          return (
            <line
              key={dim}
              x1={center}
              y1={center}
              x2={outer.x}
              y2={outer.y}
              stroke="#e2e8f0"
              strokeWidth={1}
            />
          );
        })}

        <path
          d={polygonPath}
          fill="rgba(37, 99, 235, 0.14)"
          stroke="#2563eb"
          strokeWidth={2}
          strokeLinejoin="round"
        />

        {ORDER.map((dim, idx) => {
          const pt = dataPoints[idx];
          const isTop = topThree.has(dim);
          const angle = (Math.PI * 2 * idx) / ORDER.length - Math.PI / 2;
          const labelR = radius + 24;
          const lx = center + labelR * Math.cos(angle);
          const ly = center + labelR * Math.sin(angle);
          const info = HOLLAND_DIMENSIONS[dim];

          return (
            <g key={dim}>
              <circle
                cx={pt.x}
                cy={pt.y}
                r={isTop ? 4.5 : 3.5}
                fill={isTop ? "#2563eb" : "#64748b"}
                stroke="#ffffff"
                strokeWidth={1.5}
              />
              <text
                x={lx}
                y={ly - 4}
                textAnchor="middle"
                dominantBaseline="central"
                className={`text-[11px] font-semibold ${
                  isTop ? "fill-blue-700" : "fill-slate-600"
                }`}
              >
                {dim} · {info.name.slice(0, 5)}
              </text>
              <text
                x={lx}
                y={ly + 10}
                textAnchor="middle"
                dominantBaseline="central"
                className="text-[10px] fill-slate-500 font-mono-tabular"
              >
                {scores[dim]}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
