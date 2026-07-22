import { useState } from "react";

function InternForm() {
  const [name, setName] = useState<string>("");
  const [score, setScore] = useState<number>(0);

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setName(e.target.value);
  }

  function handleScoreChange(e: React.ChangeEvent<HTMLInputElement>): void {
    // Even though the input type is "number", e.target.value is always a string.
    // Number() converts the string into a number so it matches the state type.
    setScore(Number(e.target.value));
  }

  function handleReset(): void {
    setName("");
    setScore(0);
  }

  return (
    <div>
      {/* A controlled input gets its value from React state.
          The value prop is linked to state, and onChange updates that state.
          This keeps the UI and state synchronized at all times. */}
      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        placeholder="Intern name"
      />

      <input
        type="number"
        value={score}
        onChange={handleScoreChange}
        placeholder="Score"
      />

      <p>
        Name: {name} | Score: {score}
      </p>

      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

export default InternForm;
