import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Check } from "lucide-react";
import { preferenceQuestions } from "../mock/preferences";
import { recordAnswer, markOnboardingComplete } from "../lib/preferencesStorage";
import SwipeCard from "../components/SwipeCard";

export default function Onboarding() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  const current = preferenceQuestions[index];
  const isLast = index === preferenceQuestions.length - 1;

  function handleAnswer(yes: boolean) {
    recordAnswer(current.id, yes);
    if (isLast) {
      markOnboardingComplete();
      navigate("/", { replace: true });
    } else {
      setIndex((i) => i + 1);
    }
  }

  function handleSkip() {
    markOnboardingComplete();
    navigate("/", { replace: true });
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-between bg-bg px-6 py-10">
      <div className="w-full max-w-xs">
        <div className="mb-2 flex items-center justify-between text-[12px] text-text-muted">
          <span>Quick preferences</span>
          <span className="tabular">
            {index + 1}/{preferenceQuestions.length}
          </span>
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-border">
          <div
            className="h-full rounded-full bg-accent transition-all"
            style={{ width: `${((index + 1) / preferenceQuestions.length) * 100}%` }}
          />
        </div>
      </div>

      <SwipeCard key={current.id} question={current.question} onAnswer={handleAnswer} />

      <div className="flex w-full max-w-xs flex-col items-center gap-4">
        <div className="flex gap-6">
          <button
            onClick={() => handleAnswer(false)}
            aria-label="No"
            className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-accent text-accent hover:bg-accent-bg"
          >
            <X size={24} />
          </button>
          <button
            onClick={() => handleAnswer(true)}
            aria-label="Yes"
            className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-good text-good hover:bg-good-bg"
          >
            <Check size={24} />
          </button>
        </div>

        <button
          onClick={handleSkip}
          className="text-[12px] text-text-faint hover:text-text-muted"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}