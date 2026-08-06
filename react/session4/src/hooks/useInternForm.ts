
// Code smell audit
// Smell 1: Complex conditional — handleChange() contains nested ternary operators that reduce readability.
// Smell 2: Multiple responsibilities — submit() performs validation, creates the intern object, updates context, and resets form state.
// Smell 3: Repeated initialization — initialForm is used in multiple places for resetting state, suggesting reset logic could be centralized.
import { useState } from "react";
import { validateInternForm } from "../services/intern-service";
export interface Intern {
  id: number;
  name: string;
  score: number;
  role: string;
  isPresent: boolean;
}

export interface InternFormState {
  name: string;
  score: number | "";
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
  score: "",
  role: "Frontend",
  isPresent: true,
};

function useInternForm(
  addIntern: (intern: Intern) => void,
  generateId: () => number = Date.now,
): UseInternFormReturn {
  const [form, setForm] = useState(initialForm);

  const [error, setError] = useState("");
function getFieldValue(
  target: HTMLInputElement | HTMLSelectElement,
): string | number | boolean {
  const { name, value, type } = target;

  if (type === "checkbox") {
    return target.checked;
  }

  if (name === "score") {
    return value === "" ? "" : Number(value);
  }

  return value;
}
 function handleChange(
   e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
 ) {
   const { name } = e.target;

   setForm((prev) => ({
     ...prev,
     [name]: getFieldValue(e.target),
   }));

   setError("");
 }
 // Extract Function Reflection:
// Originally, handleChange() both converted form input values (checkboxes, numbers, and text)
// and updated the form state.
// After refactoring, getFieldValue() is responsible only for converting the input value,
// while handleChange() focuses on updating state and clearing validation errors.
// This separation makes the code easier to read, test, and maintain.
  function handleReset() {
    setForm(initialForm);
    setError("");
  }

  function submit() {
    const numericScore = form.score === "" ? 0 : Number(form.score);
    const validationError = validateInternForm(form.name, numericScore);

    if (validationError) {
      setError(validationError);
      return false;
    }

    addIntern({
      id: generateId(),
      name: form.name,
      score: numericScore,
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

// Refactoring priority:
// I would fix the complex conditional in handleChange() first because nested ternary operators are difficult to read and maintain.
// Extracting the value conversion into a helper function would make the code easier for new developers to understand.