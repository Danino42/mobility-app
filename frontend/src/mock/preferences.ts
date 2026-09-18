import type { PreferenceQuestion } from "../types/domain";

export const preferenceQuestions: PreferenceQuestion[] = [
  { id: "home_charging", question: "Do you charge at home?" },
  { id: "coffee", question: "Coffee while you charge?" },
  { id: "vegan", question: "Vegan?" },
  { id: "vegetarian", question: "Vegetarian?" },
  { id: "fast_food", question: "Into fast food stops?" },
  { id: "gluten_free", question: "Gluten intolerance?" }
];