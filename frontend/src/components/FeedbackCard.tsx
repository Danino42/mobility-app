import { Smile, Meh, Frown, ThumbsUp, ThumbsDown } from "lucide-react";
import type { FeedbackComment, FeedbackMood } from "../types/domain";

interface FeedbackCardProps {
  feedback: FeedbackComment;
  userVote: "up" | "down" | null;
  onVote: (direction: "up" | "down") => void;
}

const moodConfig: Record<FeedbackMood, { icon: typeof Smile; className: string }> = {
  happy: { icon: Smile, className: "text-good" },
  neutral: { icon: Meh, className: "text-warn" },
  sad: { icon: Frown, className: "text-accent" },
};

function timeAgo(iso: string): string {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  if (days <= 0) return "today";
  if (days === 1) return "1 day ago";
  return `${days} days ago`;
}

export default function FeedbackCard({ feedback, userVote, onVote }: FeedbackCardProps) {
  const { icon: MoodIcon, className } = moodConfig[feedback.mood];

  return (
    <div className="border-b border-border px-4 py-3 last:border-b-0">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <MoodIcon size={18} className={className} />
          <span className="text-[13px] font-medium">{feedback.authorName}</span>
        </div>
        <span className="text-[11px] text-text-faint">{timeAgo(feedback.createdAt)}</span>
      </div>

      <p className="mt-1.5 text-[13px] leading-snug text-text">{feedback.text}</p>

      <div className="mt-2 flex items-center gap-3">
        <button
          type="button"
          onClick={() => onVote("up")}
          aria-pressed={userVote === "up"}
          className={`flex items-center gap-1 rounded px-1.5 py-0.5 text-[12px] tabular ${
            userVote === "up" ? "text-good" : "text-text-muted hover:text-good"
          }`}
        >
          <ThumbsUp size={13} />
          {feedback.upvotes}
        </button>
        <button
          type="button"
          onClick={() => onVote("down")}
          aria-pressed={userVote === "down"}
          className={`flex items-center gap-1 rounded px-1.5 py-0.5 text-[12px] tabular ${
            userVote === "down" ? "text-accent" : "text-text-muted hover:text-accent"
          }`}
        >
          <ThumbsDown size={13} />
          {feedback.downvotes}
        </button>
      </div>
    </div>
  );
}