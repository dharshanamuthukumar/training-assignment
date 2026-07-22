import { useState, useEffect } from "react";

function EscapeHandler() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent): void {
      // console.log('keydown fired')

      if (e.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup is important because it removes the event listener
    // when the panel closes or the component unmounts.
    // Without cleanup, a new listener is added every time the panel
    // opens, so pressing Escape can trigger multiple listeners.
    // After opening and closing the panel several times, the console
    // will log "keydown fired" multiple times, showing that the old
    // listeners were never removed and causing unnecessary memory usage.
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Panel</button>

      {isOpen && (
        <div
          style={{
            border: "1px solid #ccc",
            padding: "16px",
            marginTop: "8px",
          }}
        >
          <p>Panel is open. Press Escape to close.</p>

          <button onClick={() => setIsOpen(false)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default EscapeHandler;
