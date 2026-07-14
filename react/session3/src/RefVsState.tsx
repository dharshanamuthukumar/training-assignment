import { useState, useRef } from "react";

function RefVsState() {
  const [stateCount, setStateCount] = useState<number>(0);
  const refCount = useRef<number>(0);

  function incrementState(): void {
    setStateCount((prev) => prev + 1);
  }

  function incrementRef(): void {
    refCount.current += 1;
    console.log("Ref value:", refCount.current);
  }

  return (
    <div>
      {/* useState updates the value and causes the component to re-render,
          so the UI always displays the latest state value.
          useRef stores a value that persists between renders but changing
          ref.current does not trigger a re-render.
          Use useState for data that should be shown in the UI.
          Use useRef for mutable values or DOM references that do not need
          to cause the UI to update. */}

      <p>State count (shown in UI): {stateCount}</p>

      <p>Ref count (check console): {refCount.current}</p>

      <button onClick={incrementState}>Increment State</button>

      <button onClick={incrementRef}>Increment Ref</button>
    </div>
  );
}

export default RefVsState;
