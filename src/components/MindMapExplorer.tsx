import React, { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { MIND_MAP_NODES, MindMapGroup, MindMapNode } from "../data/userPreset";

interface MindMapExplorerProps {
  onOpenCharts: () => void;
  onOpenManuscript: () => void;
}

const COLUMN_TITLES: { col: 0 | 1 | 2 | 3; label: string }[] = [
  { col: 0, label: "Stage 1 Roots" },
  { col: 1, label: "Stage 2 Assessments" },
  { col: 2, label: "Career Directions" },
  { col: 3, label: "Next Step" },
];

const SVG_WIDTH = 920;
const SVG_HEIGHT = 440;

const COL_X: Record<0 | 1 | 2 | 3, number> = {
  0: 115,
  1: 350,
  2: 605,
  3: 815,
};

const NODE_WIDTH = 178;
const NODE_HEIGHT = 64;

function getNodeCenter(node: MindMapNode): { x: number; y: number } {
  const x = COL_X[node.column];
  const y = 78 + node.row * 96;
  return { x, y };
}

const GROUP_STYLES: Record<
  MindMapGroup,
  { border: string; activeBg: string; labelColor: string }
> = {
  stage1: {
    border: "border-slate-300",
    activeBg: "bg-slate-900 text-white border-slate-900",
    labelColor: "text-slate-500",
  },
  stage2: {
    border: "border-blue-200",
    activeBg: "bg-blue-600 text-white border-blue-600",
    labelColor: "text-blue-600",
  },
  career: {
    border: "border-emerald-200",
    activeBg: "bg-emerald-700 text-white border-emerald-700",
    labelColor: "text-emerald-700",
  },
  next: {
    border: "border-amber-200",
    activeBg: "bg-amber-700 text-white border-amber-700",
    labelColor: "text-amber-700",
  },
};

export const MindMapExplorer: React.FC<MindMapExplorerProps> = ({
  onOpenCharts,
  onOpenManuscript,
}) => {
  const [selectedId, setSelectedId] = useState<string>("s2-enfp");
  const [filterGroup, setFilterGroup] = useState<"all" | MindMapGroup>("all");

  const selectedNode = useMemo(
    () => MIND_MAP_NODES.find((n) => n.id === selectedId) || MIND_MAP_NODES[0],
    [selectedId]
  );

  const highlightedSet = useMemo(() => {
    const set = new Set<string>([selectedNode.id]);
    selectedNode.connectedTo.forEach((id) => set.add(id));
    return set;
  }, [selectedNode]);

  // Deduplicated directional edges (left-to-right)
  const edges = useMemo(() => {
    const list: { from: MindMapNode; to: MindMapNode; id: string }[] = [];
    const seen = new Set<string>();
    for (const node of MIND_MAP_NODES) {
      for (const targetId of node.connectedTo) {
        const target = MIND_MAP_NODES.find((n) => n.id === targetId);
        if (!target || node.column >= target.column) continue;
        const key = `${node.id}->${target.id}`;
        if (!seen.has(key)) {
          seen.add(key);
          list.push({ id: key, from: node, to: target });
        }
      }
    }
    return list;
  }, []);

  const connectedNodes = useMemo(
    () =>
      MIND_MAP_NODES.filter(
        (n) => n.id !== selectedNode.id && selectedNode.connectedTo.includes(n.id)
      ),
    [selectedNode]
  );

  return (
    <div className="mx-auto max-w-[1280px] px-6 py-8 space-y-8">
      {/* Personal Editorial Intro */}
      <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-slate-200 pb-6">
        <div className="space-y-2 max-w-2xl">
          <p className="text-xs font-medium text-slate-500">
            Tran Hai Yen · ENFP · Holland Code SRA/SAR
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 text-balance">
            Hi, I&apos;m Hai Yen.
          </h1>
          <p className="text-sm leading-relaxed text-slate-600">
            I&apos;m curious about Biology and Medicine, enjoy Design and Photography, and put together this map to see how my ENFP and Holland Code (SRA/SAR) results connect.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenCharts}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
          >
            See Charts &amp; Venn
          </button>
          <button
            type="button"
            onClick={onOpenManuscript}
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition-colors whitespace-nowrap shrink-0"
          >
            <span>Read My Story</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </section>

      {/* Interactive Mind Map + Selected Node Detail */}
      <section className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">
        {/* Interactive Canvas (8 cols) */}
        <div className="xl:col-span-8 rounded-xl border border-slate-200 bg-white p-5 flex flex-col justify-between space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-lg font-semibold text-slate-900">
                Interactive Self-Discovery Mind Map
              </h2>
              <p className="text-xs text-slate-500">
                Click any node to highlight its direct Stage 1, Stage 2, and career pathways
              </p>
            </div>

            <div className="inline-flex items-center gap-1 rounded-lg bg-slate-100 p-1 overflow-x-auto">
              {(
                [
                  { id: "all", label: "All Paths" },
                  { id: "stage1", label: "Stage 1" },
                  { id: "stage2", label: "MBTI & Holland" },
                  { id: "career", label: "Careers" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilterGroup(tab.id)}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                    filterGroup === tab.id
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Responsive Horizontally Scrollable SVG + Node Canvas */}
          <div className="overflow-x-auto pb-2">
            <div
              className="relative mx-auto select-none"
              style={{ width: SVG_WIDTH, height: SVG_HEIGHT }}
            >
              {/* Column Headers */}
              {COLUMN_TITLES.map((c) => (
                <div
                  key={c.col}
                  style={{ left: COL_X[c.col] - NODE_WIDTH / 2, width: NODE_WIDTH }}
                  className="absolute top-1 text-center text-[11px] font-semibold text-slate-400"
                >
                  {c.label}
                </div>
              ))}

              {/* Curved Connector Lines */}
              <svg
                width={SVG_WIDTH}
                height={SVG_HEIGHT}
                className="absolute inset-0 pointer-events-none"
                aria-hidden="true"
              >
                {edges.map((edge) => {
                  const p1 = getNodeCenter(edge.from);
                  const p2 = getNodeCenter(edge.to);
                  const startX = p1.x + NODE_WIDTH / 2;
                  const endX = p2.x - NODE_WIDTH / 2;
                  const midX = (startX + endX) / 2;
                  const pathD = `M ${startX} ${p1.y} C ${midX} ${p1.y}, ${midX} ${p2.y}, ${endX} ${p2.y}`;

                  const touchesSelected =
                    edge.from.id === selectedNode.id ||
                    edge.to.id === selectedNode.id;
                  const passesFilter =
                    filterGroup === "all" ||
                    edge.from.group === filterGroup ||
                    edge.to.group === filterGroup;

                  return (
                    <path
                      key={edge.id}
                      d={pathD}
                      fill="none"
                      stroke={touchesSelected ? "#2563eb" : "#cbd5e1"}
                      strokeWidth={touchesSelected ? 2.5 : 1.25}
                      strokeOpacity={
                        !passesFilter ? 0.15 : touchesSelected ? 1 : 0.65
                      }
                      className="transition-all duration-200"
                    />
                  );
                })}
              </svg>

              {/* Interactive Nodes */}
              {MIND_MAP_NODES.map((node) => {
                const center = getNodeCenter(node);
                const isSelected = node.id === selectedNode.id;
                const isConnected = highlightedSet.has(node.id);
                const passesFilter =
                  filterGroup === "all" || node.group === filterGroup;
                const style = GROUP_STYLES[node.group];

                return (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => setSelectedId(node.id)}
                    style={{
                      left: center.x - NODE_WIDTH / 2,
                      top: center.y - NODE_HEIGHT / 2,
                      width: NODE_WIDTH,
                      height: NODE_HEIGHT,
                    }}
                    className={`absolute rounded-xl border px-3 py-2 text-left transition-all duration-150 flex flex-col justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                      isSelected
                        ? `${style.activeBg} shadow-sm z-10`
                        : isConnected
                        ? `bg-white ${style.border} ring-2 ring-blue-100 z-10`
                        : "bg-white border-slate-200 hover:border-slate-300"
                    } ${!passesFilter && !isSelected ? "opacity-35" : "opacity-100"}`}
                  >
                    <span
                      className={`text-[10px] font-medium truncate ${
                        isSelected ? "text-white/80" : style.labelColor
                      }`}
                    >
                      {node.sublabel}
                    </span>
                    <span
                      className={`text-xs font-semibold leading-snug truncate ${
                        isSelected ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {node.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Selected Node Insight Panel (4 cols) */}
        <aside className="xl:col-span-4 rounded-xl border border-slate-200 bg-white p-6 flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <p className="text-xs font-medium text-blue-600">
                {selectedNode.sublabel}
              </p>
              <h3 className="font-display text-2xl font-semibold text-slate-900 mt-0.5">
                {selectedNode.label}
              </h3>
            </div>

            <p className="text-sm leading-relaxed text-slate-700">
              {selectedNode.summary}
            </p>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 space-y-1.5">
              <p className="text-[11px] font-semibold text-slate-500">
                In My Words
              </p>
              <p className="text-xs italic leading-relaxed text-slate-800">
                &ldquo;{selectedNode.quote}&rdquo;
              </p>
            </div>

            <div className="space-y-2 pt-1">
              <p className="text-xs font-semibold text-slate-700">
                Connected Nodes ({connectedNodes.length})
              </p>
              <div className="flex flex-wrap gap-2">
                {connectedNodes.map((cn) => (
                  <button
                    key={cn.id}
                    type="button"
                    onClick={() => setSelectedId(cn.id)}
                    className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                  >
                    {cn.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4 text-xs text-slate-500">
            Select any node across the map to trace how my interests, strengths, and career goals connect.
          </div>
        </aside>
      </section>

      {/* Core Takeaway Strip */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-1.5">
          <p className="font-mono-tabular text-xs font-semibold text-slate-500">
            01. What Stood Out
          </p>
          <p className="text-sm font-semibold text-slate-900">
            Science &amp; Creativity Fit Together
          </p>
          <p className="text-xs leading-relaxed text-slate-600">
            Seeing ENFP alongside SRA/SAR showed me that helping people (8/10), hands-on problem-solving (7/10), and creative work (7/10) can actually support each other.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-1.5">
          <p className="font-mono-tabular text-xs font-semibold text-blue-600">
            02. Looking Back
          </p>
          <p className="text-sm font-semibold text-slate-900">
            Confirmed My Stage 1 Interests
          </p>
          <p className="text-xs leading-relaxed text-slate-600">
            Matched what I already noticed in Stage 1: Biology, Art, Design, Photography, and Science, along with valuing discipline, resilience, and personal growth.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-1.5">
          <p className="font-mono-tabular text-xs font-semibold text-emerald-700">
            03. Where I&apos;m Looking Next
          </p>
          <p className="text-sm font-semibold text-slate-900">
            Medicine &amp; Biomedical Science
          </p>
          <p className="text-xs leading-relaxed text-slate-600">
            Next up, I want to get hands-on exposure to clinical medicine and biomedical research to see which daily environment fits me best.
          </p>
        </div>
      </section>
    </div>
  );
};
