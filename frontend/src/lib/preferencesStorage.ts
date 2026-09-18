import type { PreferenceId, UserPreferences } from "../types/domain";

const STORAGE_KEY = "mobility-app:preferences";

export function loadPreferences(): UserPreferences {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { answers: {}, completedOnboarding: false };
    return JSON.parse(raw) as UserPreferences;
  } catch {
    return { answers: {}, completedOnboarding: false };
  }
}

export function savePreferences(prefs: UserPreferences) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    // ignore storage failures (e.g. private browsing) -- onboarding will
    // just show again next time, which is an acceptable fallback.
  }
}

export function recordAnswer(id: PreferenceId, value: boolean) {
  const prefs = loadPreferences();
  prefs.answers[id] = value;
  savePreferences(prefs);
}

export function markOnboardingComplete() {
  const prefs = loadPreferences();
  prefs.completedOnboarding = true;
  savePreferences(prefs);
}