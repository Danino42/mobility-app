interface ToggleSwitchProps {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
}

export default function ToggleSwitch({ checked, onChange, label }: ToggleSwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
        checked ? "bg-border" : "bg-accent"
      }`}
    >
            <span
        className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow-sm transition-transform ${
          checked ? "translate-x-[-23px]" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}