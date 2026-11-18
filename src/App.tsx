import { useState } from "react";
import { AppView } from "./types/reflection";
import {
  TRAN_HAI_YEN_MANUSCRIPT,
  TRAN_HAI_YEN_PROFILE,
} from "./data/userPreset";
import { HeaderProgressBar } from "./components/HeaderProgressBar";
import { MindMapExplorer } from "./components/MindMapExplorer";
import { AssessmentCharts } from "./components/AssessmentCharts";
import { ManuscriptReader } from "./components/ManuscriptReader";

export default function App() {
  const [view, setView] = useState<AppView>("mindmap");
  const [focusedSection, setFocusedSection] = useState<1 | 2 | 3 | null>(null);

  const profile = TRAN_HAI_YEN_PROFILE;
  const manuscript = TRAN_HAI_YEN_MANUSCRIPT;

  const handleJumpToSection = (sectionNum: 1 | 2 | 3) => {
    setView("manuscript");
    setFocusedSection(sectionNum);
    setTimeout(() => {
      const el = document.getElementById(`reflection-section-${sectionNum}`);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  const handleExportPdf = () => {
    setView("manuscript");
    setTimeout(() => {
      window.print();
    }, 120);
  };

  const navItems: { id: AppView; label: string }[] = [
    { id: "mindmap", label: "Mind Map" },
    { id: "charts", label: "Assessment Charts" },
    { id: "manuscript", label: "About Me" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Top Header with 3-Section Manuscript Progress Bar */}
      <header className="no-print sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto max-w-[1280px] px-6 h-16 flex items-center justify-between gap-6">
          {/* Zone 1: Single text element wordmark */}
          <button
            type="button"
            onClick={() => setView("mindmap")}
            className="font-display text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Tran Hai Yen
          </button>

          {/* Zone 2: Clean single-line navigation links */}
          <nav
            aria-label="Primary"
            className="flex items-center gap-6 overflow-x-auto"
          >
            {navItems.map((item) => {
              const isActive = view === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setFocusedSection(null);
                    setView(item.id);
                  }}
                  className={`py-1 text-sm font-medium transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                    isActive
                      ? "border-blue-600 text-slate-900"
                      : "border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Manuscript Progress Bar + Export PDF */}
          <div className="flex items-center gap-5 shrink-0">
            <HeaderProgressBar
              manuscript={manuscript}
              onSelectSection={handleJumpToSection}
            />
            <button
              type="button"
              onClick={handleExportPdf}
              className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0"
            >
              Export PDF
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {view === "mindmap" && (
          <MindMapExplorer
            onOpenCharts={() => setView("charts")}
            onOpenManuscript={() => setView("manuscript")}
          />
        )}

        {view === "charts" && <AssessmentCharts />}

        {view === "manuscript" && (
          <ManuscriptReader
            profile={profile}
            manuscript={manuscript}
            focusedSection={focusedSection}
          />
        )}
      </main>
    </div>
  );
}
