import { useState } from "react";

interface AddInternFormProps {
  onAdd: (intern: { name: string; score: number }) => void;
  count: number;
}

function AddInternForm({ onAdd, count }: AddInternFormProps) {
  const [name, setName] = useState("");
  const [score, setScore] = useState(0);
  const [error, setError] = useState("");

  function handleSubmit() {
    if (name.trim() === "") {
      setError("Name is required");
      return;
    }

    if (score < 0 || score > 100) {
      setError("Score must be between 0 and 100");
      return;
    }

    setError("");

    onAdd({
      name,
      score,
    });

    setName("");
    setScore(0);
  }

  function handleReset() {
    setName("");
    setScore(0);
    setError("");
  }

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);

    if (e.target.value.trim() !== "") {
      setError("");
    }
  }

  function handleScoreChange(e: React.ChangeEvent<HTMLInputElement>) {
    setScore(Number(e.target.value));
  }

  return (
    <div>
      <p>Total Interns: {count}</p>

      {error && <p>{error}</p>}

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={handleNameChange}
      />

      <input
        type="number"
        placeholder="Score"
        value={score}
        onChange={handleScoreChange}
      />

      <button onClick={handleSubmit}>Add Intern</button>

      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

export default AddInternForm;
