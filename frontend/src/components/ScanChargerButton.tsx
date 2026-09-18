import { useRef } from "react";
import chargeIcon from "../images/charge.png";

export default function ScanChargerButton() {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    // TODO: once a QR-decoding library is wired in, read `file` here and
    // parse the partner station code. For now this just captures the
    // photo from the camera.
    if (file) {
      console.log("Captured QR scan photo:", file.name);
    }
    // reset so selecting the same file again still fires onChange
    e.target.value = "";
  }

  return (
    <>
      {/* Fixed to the viewport so it stays visible while scrolling, but
          capped to the app shell's own max-width column (480px) and
          centered the same way, so it sits at the shell's bottom-right
          corner rather than drifting to the browser window's edge on
          wide screens. */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 mx-auto max-w-[480px]">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          aria-label="Scan QR code to charge at a partner station"
          className="pointer-events-auto absolute bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-accent shadow-lg transition-transform hover:scale-105 active:scale-95"
        >
          <span
            aria-hidden="true"
            className="block h-7 w-7 bg-white"
            style={{
              WebkitMaskImage: `url(${chargeIcon})`,
              maskImage: `url(${chargeIcon})`,
              WebkitMaskSize: "contain",
              maskSize: "contain",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              maskPosition: "center",
            }}
          />
        </button>
      </div>

      {/* capture="environment" opens the rear camera directly on mobile,
          rather than a generic file picker. */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
      />
    </>
  );
}