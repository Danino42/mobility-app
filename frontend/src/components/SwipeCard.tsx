import { useRef, useState } from "react";
import { X, Check } from "lucide-react";

interface SwipeCardProps {
  question: string;
  onAnswer: (yes: boolean) => void;
}

const SWIPE_THRESHOLD = 90;

export default function SwipeCard({ question, onAnswer }: SwipeCardProps) {
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startX = useRef(0);

  function handlePointerDown(e: React.PointerEvent) {
    setDragging(true);
    startX.current = e.clientX;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (!dragging) return;
    setDragX(e.clientX - startX.current);
  }

  function handlePointerUp() {
    setDragging(false);
    if (dragX > SWIPE_THRESHOLD) {
      onAnswer(true);
    } else if (dragX < -SWIPE_THRESHOLD) {
      onAnswer(false);
    }
    setDragX(0);
  }

  const rotation = dragX / 18;
  const yesOpacity = Math.min(Math.max(dragX / SWIPE_THRESHOLD, 0), 1);
  const noOpacity = Math.min(Math.max(-dragX / SWIPE_THRESHOLD, 0), 1);

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className="relative flex h-72 w-full max-w-xs cursor-grab select-none flex-col items-center justify-center rounded-2xl border border-border bg-surface px-6 text-center shadow-md active:cursor-grabbing"
      style={{
        transform: `translateX(${dragX}px) rotate(${rotation}deg)`,
        transition: dragging ? "none" : "transform 0.2s ease",
        touchAction: "pan-y",
      }}
    >
      <span
        className="absolute left-5 top-5 rounded border-2 border-accent px-2 py-1 text-[13px] font-medium text-accent"
        style={{ opacity: noOpacity }}
      >
        NO
      </span>
      <span
        className="absolute right-5 top-5 rounded border-2 border-good px-2 py-1 text-[13px] font-medium text-good"
        style={{ opacity: yesOpacity }}
      >
        YES
      </span>

      <p className="text-[18px] font-medium leading-snug">{question}</p>

      <div className="mt-8 flex items-center gap-3 text-text-faint">
        <X size={16} />
        <span className="text-[11px]">swipe</span>
        <Check size={16} />
      </div>
    </div>
  );
}