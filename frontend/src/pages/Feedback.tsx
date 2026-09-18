import { useState } from "react";
import { MessageSquareHeart } from "lucide-react";
import { mockFeedback } from "../mock/feedback";
import type { FeedbackComment, FeedbackMood } from "../types/domain";
import MoodPicker from "../components/MoodPicker";
import FeedbackCard from "../components/FeedbackCard";

export default function Feedback() {
  const [mood, setMood] = useState<FeedbackMood | null>(null);
  const [text, setText] = useState("");
  const [comments, setComments] = useState<FeedbackComment[]>(mockFeedback);
  const [votes, setVotes] = useState<Record<string, "up" | "down" | null>>({});
  const [submitted, setSubmitted] = useState(false);

  function handleVote(id: string, direction: "up" | "down") {
    const current = votes[id] ?? null;
    const next = current === direction ? null : direction;

    setComments((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        let upvotes = c.upvotes;
        let downvotes = c.downvotes;

        // undo the previous vote, if any
        if (current === "up") upvotes -= 1;
        if (current === "down") downvotes -= 1;
        // apply the new vote, if any
        if (next === "up") upvotes += 1;
        if (next === "down") downvotes += 1;

        return { ...c, upvotes, downvotes };
      })
    );
    setVotes((prev) => ({ ...prev, [id]: next }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!mood || !text.trim()) return;

    const newComment: FeedbackComment = {
      id: `fb-new-${Date.now()}`,
      authorName: "You",
      mood,
      text: text.trim(),
      upvotes: 0,
      downvotes: 0,
      createdAt: new Date().toISOString(),
    };
    setComments((prev) => [newComment, ...prev]);
    setMood(null);
    setText("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
  }

  return (
    <div>
      <div className="px-4 pt-4">
        <h1 className="text-[16px] font-medium">Feedback</h1>
        <p className="mt-0.5 text-[12px] text-text-muted">
          Tell us what's working and what isn't -- honest feedback shapes what we build next.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mx-4 mt-3 flex flex-col gap-3 rounded border border-border bg-surface px-4 py-4"
      >
        <div className="flex items-center gap-2 text-[13px] font-medium">
          <MessageSquareHeart size={16} className="text-accent" />
          How's the app treating you?
        </div>

        <MoodPicker value={mood} onChange={setMood} />

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Be honest -- what should we fix or keep doing?"
          rows={3}
          className="w-full resize-none rounded border border-border bg-bg px-3 py-2 text-[13px] text-text placeholder:text-text-faint focus:border-accent-dim focus:outline-none"
        />

        <button
          type="submit"
          disabled={!mood || !text.trim()}
          className="rounded bg-accent py-2 text-[13px] font-medium text-on-accent hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {submitted ? "Thanks for the feedback!" : "Submit feedback"}
        </button>
      </form>

      <div className="mt-4">
        <p className="px-4 pb-1 text-[11px] text-text-muted">
          {comments.length} reviews from your colleagues
        </p>
        <div className="border-y border-border bg-surface">
          {comments.map((c) => (
            <FeedbackCard
              key={c.id}
              feedback={c}
              userVote={votes[c.id] ?? null}
              onVote={(direction) => handleVote(c.id, direction)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}