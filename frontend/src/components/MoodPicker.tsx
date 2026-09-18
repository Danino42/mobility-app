import { Smile, Meh, Frown } from "lucide-react";
import type { FeedbackMood } from "../types/domain";

interface MoodPickerProps {
  value: FeedbackMood | null;
  onChange: (mood: FeedbackMood) => void;
}

const moods: { id: FeedbackMood; icon: typeof Smile; activeClass: string }[] = [
  { id: "happy", icon: Smile, activeClass: "border-good bg-good-bg text-good" },
  { id: "neutral", icon: Meh, activeClass: "border-warn bg-warn-bg text-warn" },
  { id: "sad", icon: Frown, activeClass: "border-accent bg-accent-bg text-accent" },
];

export default function MoodPicker({ value, onChange }: MoodPickerProps) {
  return (
    <div className="flex gap-3">
      {moods.map(({ id, icon: Icon, activeClass }) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          aria-label={id}
          aria-pressed={value === id}
          className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition-colors ${
            value === id ? activeClass : "border-border text-text-faint hover:text-text-muted"
          }`}
        >
          <Icon size={22} />
        </button>
      ))}
    </div>
  );
}