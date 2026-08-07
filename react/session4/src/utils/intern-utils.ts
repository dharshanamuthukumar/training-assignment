
interface Intern {
  id: number;
  name: string;
  score: number;
  role: string;
  isPresent: boolean;
}

export function filterInterns(interns: Intern[], searchTerm: string): Intern[] {
  return interns.filter(
    (intern) =>
      intern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      intern.role.toLowerCase().includes(searchTerm.toLowerCase()),
  );
}
