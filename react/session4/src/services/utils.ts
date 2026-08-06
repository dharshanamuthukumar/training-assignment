/*
Task 4.1 — Module Encapsulation Audit

formatName() → Internal helper. Removed export.
isValidScore() → Internal helper. Removed export.
capitalizeRole() → Internal helper. Removed export.

None of these helpers need to be accessed outside the services layer.
Keeping them unexported hides implementation details and reduces coupling.
*/

function formatName(name: string): string {
  return name.trim();
}

function isValidScore(score: number): boolean {
  return score >= 0 && score <= 100;
}

function capitalizeRole(role: string): string {
  return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
}
