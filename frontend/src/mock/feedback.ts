import type { FeedbackComment } from "../types/domain";

export const mockFeedback: FeedbackComment[] = [
  {
    id: "fb-1",
    authorName: "M. Steiner",
    mood: "happy",
    text: "The meal deal at the Kirchberg charger saved me a real stop on the way to Zurich. More of this please!",
    upvotes: 24,
    downvotes: 1,
    createdAt: "2026-09-10T08:00:00.000Z",
  },
  {
    id: "fb-2",
    authorName: "L. Fankhauser",
    mood: "neutral",
    text: "App works fine, but I wish the map showed traffic before I pick a charger.",
    upvotes: 12,
    downvotes: 3,
    createdAt: "2026-09-12T14:30:00.000Z",
  },
  {
    id: "fb-3",
    authorName: "A. Berisha",
    mood: "sad",
    text: "The E-Score dropped even though I charged at home the whole week. Not sure what it's actually measuring.",
    upvotes: 9,
    downvotes: 6,
    createdAt: "2026-09-14T19:15:00.000Z",
  },
  {
    id: "fb-4",
    authorName: "R. Oppliger",
    mood: "happy",
    text: "Company leaderboard is a nice touch, our team actually started talking about charging habits at lunch.",
    upvotes: 31,
    downvotes: 2,
    createdAt: "2026-09-15T09:45:00.000Z",
  },
];