import { useState } from "react";
import { useInterns } from "../contexts/intern-context";

interface AddInternFormProps {
  onAdd?: (intern: { name: string; score: number; role?: string; isPresent?: boolean }) => void;
  count?: number;
}

function AddInternForm({ onAdd, count }: AddInternFormProps) {
  const { interns, addIntern } = useInterns();
  const [name, setName] = useState("");
  const [score, setScore] = useState<number | string>(0);
  const [role, setRole] = useState("Frontend");
  const [isPresent, setIsPresent] = useState(true);
  const [error, setError] = useState("");

  const totalCount = count !== undefined ? count : interns.length;

  function handleSubmit(e?: React.FormEvent) {
    if (e) e.preventDefault();

    if (name.trim() === "") {
      setError("Name is required");
      return;
    }

    const numericScore = Number(score);
    if (score === "" || isNaN(numericScore) || numericScore < 0 || numericScore > 100) {
      setError("Score must be between 0 and 100");
      return;
    }

    setError("");

    if (onAdd) {
      onAdd({ name, score: numericScore, role, isPresent });
    }
    if (addIntern) {
      addIntern({
        id: Date.now(),
        name,
        score: numericScore,
        role,
        isPresent,
      });
    }

    setName("");
    setScore(0);
    setRole("Frontend");
    setIsPresent(true);
  }

  function handleReset() {
    setName("");
    setScore(0);
    setRole("Frontend");
    setIsPresent(true);
    setError("");
  }

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
    if (e.target.value.trim() !== "") {
      setError("");
    }
  }

  function handleScoreChange(e: React.ChangeEvent<HTMLInputElement>) {
    setScore(e.target.value);
  }

  return (
    <form role="form" aria-label="Add Intern" onSubmit={handleSubmit}>
      <p>Total Interns: {totalCount}</p>

      {error && <p role="alert" className="error">{error}</p>}

      <div>
        <label htmlFor="internName">Intern Name</label>
        <input
          id="internName"
          type="text"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
        />
      </div>

      <div>
        <label htmlFor="internScore">Score</label>
        <input
          id="internScore"
          type="number"
          placeholder="Score"
          value={score}
          onChange={handleScoreChange}
        />
      </div>

      <button type="submit">Add Intern</button>

      <button type="button" onClick={handleReset}>Reset</button>

      <div>
        <label htmlFor="internRole">Role</label>
        <select
          id="internRole"
          name="role"
          aria-label="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="Fullstack">Fullstack</option>
        </select>
      </div>

      <div>
        <label htmlFor="isPresent">Present</label>
        <input
          id="isPresent"
          type="checkbox"
          aria-label="Present"
          checked={isPresent}
          onChange={(e) => setIsPresent(e.target.checked)}
        />
      </div>
    </form>
  );
}

export default AddInternForm;
