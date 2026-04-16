import type { AppState, TabName } from "@/types";

interface NavigationProps {
  activeTab: TabName;
  onTabChange: (tab: TabName) => void;
  appState: AppState;
  onReset: () => void;
}

export default function Navigation({
  activeTab,
  onTabChange,
  appState,
  onReset,
}: NavigationProps) {
  const tabs: { name: TabName; label: string }[] = [
    { name: "setup", label: "Setup" },
  ];

  if (appState === "result") {
    tabs.push({ name: "result", label: "Result" });
    tabs.push({ name: "surveyForm", label: "SurveyJS Form" });
  }

  if (appState === "error") {
    tabs.push({ name: "error", label: "Error" });
  }

  return (
    <div className="bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <nav className="flex space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => onTabChange(tab.name)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.name
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
          <button
            onClick={onReset}
            className="text-sm text-gray-500 hover:text-gray-700 px-3 py-1 rounded hover:bg-gray-100 transition-colors"
          >
            ↺ Reset
          </button>
        </div>
      </div>
    </div>
  );
}
