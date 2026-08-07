
export interface InternFormState {
  name: string;
  score: number;
  isPresent: boolean;
  role: string;
}

export function prepareInternRequest(data: InternFormState) {
  return {
    url: "/api/interns",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  };
}
