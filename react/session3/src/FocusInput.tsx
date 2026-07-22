import { useRef } from "react";

function FocusInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFocus(): void {
    // Optional chaining (?.) is used because inputRef.current can be null.
    // It is null before the input element is mounted or after it is
    // unmounted. Using ?. prevents an error by calling focus() only
    // when the input element exists.
    inputRef.current?.focus();
  }

  function handleClear(): void {
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  }

  return (
    <div>
      <input ref={inputRef} type="text" placeholder="Type something..." />

      <button onClick={handleFocus}>Focus Input</button>

      <button onClick={handleClear}>Clear and Focus</button>
    </div>
  );
}

export default FocusInput;
