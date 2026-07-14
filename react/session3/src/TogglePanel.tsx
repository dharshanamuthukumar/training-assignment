import { useState } from "react";

function TogglePanel() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      <button
        onClick={() =>
          // Both setIsOpen(!isOpen) and setIsOpen(prev => !prev) work.
          // The functional update is safer because it always uses the
          // latest state value. This avoids stale state issues when
          // multiple state updates are queued or happen asynchronously.
          setIsOpen((prev) => !prev)
        }
      >
        {isOpen ? "Hide Details" : "Show Details"}
      </button>

      {isOpen && (
        <div>
          <p>Name: Rahul</p>
          <p>Score: 92</p>
          <p>Role: Frontend</p>
        </div>
      )}
    </div>
  );
}

export default TogglePanel;
