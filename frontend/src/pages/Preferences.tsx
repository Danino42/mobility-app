import { useState } from "react";
import { preferenceQuestions } from "../mock/preferences";
import { loadPreferences, recordAnswer } from "../lib/preferencesStorage";
import type { PreferenceId } from "../types/domain";
import ToggleSwitch from "../components/ToggleSwitch";

export default function Preferences() {
  const [answers, setAnswers] = useState<Partial<Record<PreferenceId, boolean>>>(
    () => loadPreferences().answers
  );

  function handleToggle(id: PreferenceId, value: boolean) {
    recordAnswer(id, value);
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }

  return (
    <div>
      <div className="px-4 pt-4">
        <h1 className="text-[16px] font-medium">Preferences</h1>
        <p className="mt-0.5 text-[12px] text-text-muted">
          These shape which chargers and stops we recommend for you
        </p>
      </div>

      <div className="mt-4 border-y border-border bg-surface">
        {preferenceQuestions.map((q) => {
          const value = answers[q.id] ?? false;
          return (
            <div
              key={q.id}
              className="flex items-center justify-between gap-3 border-b border-border px-4 py-3.5 last:border-b-0"
            >
              <span className="text-[14px]">{q.question}</span>
              <ToggleSwitch
                checked={value}
                onChange={(v) => handleToggle(q.id, v)}
                label={q.question}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}