import { useState } from "react";

interface InternFormState {
  name: string;
  score: number;
  isPresent: boolean;
  role: string;
}

interface UseInternFormReturn {
  form: InternFormState;
  error: string;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  handleReset: () => void;
  isValid: () => boolean;
}

const initialForm: InternFormState = {
  name: "",
  score: 0,
  isPresent: true,
  role: "Frontend",
};

function useInternForm(): UseInternFormReturn {
  const [form, setForm] = useState<InternFormState>(initialForm);
  const [error, setError] = useState<string>("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ): void {
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
  }

  function handleReset(): void {
    setForm(initialForm);
    setError("");
  }

  function isValid(): boolean {
    if (!form.name.trim()) {
      setError("Name is required");
      return false;
    }

    if (form.score < 0 || form.score > 100) {
      setError("Score must be 0–100");
      return false;
    }

    setError("");
    return true;
  }

  return { form, error, handleChange, handleReset, isValid };
}

export default useInternForm;
// The UseInternFormReturn interface defines exactly what the custom hook
// returns. It improves type safety, provides better editor auto-completion,
// makes the hook easier to understand, and ensures any component using
// the hook receives the expected properties and functions.
