import { useState } from "react";
import { validateInternForm } from "../utils/intern-validation";

export interface Intern {
  id: number;
  name: string;
  score: number;
  role: string;
  isPresent: boolean;
}

export interface InternFormState {
  name: string;
  score: number;
  role: string;
  isPresent: boolean;
}

interface UseInternFormReturn {
  form: InternFormState;
  error: string;

  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;

  handleReset: () => void;

  submit: () => boolean;
}

const initialForm: InternFormState = {
  name: "",
  score: 0,
  role: "Frontend",
  isPresent: true,
};

function useInternForm(
  addIntern: (intern: Intern) => void,
  generateId: () => number = Date.now,
): UseInternFormReturn {
  const [form, setForm] = useState(initialForm);

  const [error, setError] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : name === "score"
            ? Number(value)
            : value,
    }));
    setError("");
  }

  function handleReset() {
    setForm(initialForm);
    setError("");
  }

  function submit() {
    const validationError = validateInternForm(form.name, form.score);

    if (validationError) {
      setError(validationError);
      return false;
    }

    addIntern({
      id: generateId(),
      name: form.name,
      score: form.score,
      role: form.role,
      isPresent: form.isPresent,
    });

    setError("");

    setForm(initialForm);

    return true;
  }

  return {
    form,
    error,
    handleChange,
    handleReset,
    submit,
  };
}

export default useInternForm;

// Task 6.1
// Validation has been extracted into a pure function.
// addIntern is injected instead of coming from context.
// generateId is injected with a default implementation.
// This makes the hook easier to test because external
// dependencies can be replaced with mocks.
