import { useInterns } from "../contexts/intern-context";
import useInternForm from "../hooks/useInternForm";

interface AddInternFormProps {
  count?: number;
}

function AddInternForm({ onAdd, count }: AddInternFormProps & { onAdd?: (intern: any) => void }) {
  const { interns, addIntern } = useInterns();

  const handleAdd = onAdd || addIntern;

  const { form, error, handleChange, handleReset, submit } =
    useInternForm(handleAdd);

  const totalCount = count ?? interns.length;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    submit();
  }

  return (
    <form role="form" aria-label="Add Intern" onSubmit={handleSubmit}>
      <p>Total Interns: {totalCount}</p>

      {error && (
        <p role="alert" className="error">
          {error}
        </p>
      )}

      <div>
        <label htmlFor="name">Intern Name</label>

        <input
          id="name"
          name="name"
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="score">Score</label>

        <input
          id="score"
          name="score"
          type="number"
          placeholder="Score"
          value={form.score}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="role">Role</label>

        <select id="role" name="role" value={form.role} onChange={handleChange}>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="Fullstack">Fullstack</option>
        </select>
      </div>

      <div>
        <label htmlFor="isPresent">Present</label>

        <input
          id="isPresent"
          name="isPresent"
          type="checkbox"
          checked={form.isPresent}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Add Intern</button>

      <button type="button" onClick={handleReset}>
        Reset
      </button>
    </form>
  );
}

export default AddInternForm;
