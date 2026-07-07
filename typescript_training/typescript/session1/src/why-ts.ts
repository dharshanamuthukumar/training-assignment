type User = {
  fullName: string;
};

function getUserLabel(user: User): string {
  return user.fullName.toUpperCase();
}

const user: User = {
  fullName: "Alice Smith",
};

console.log(getUserLabel(user));
// In JavaScript, the bug was found only when the code was executed.
// In TypeScript, the compiler found the typo before the code ran,
// preventing a runtime error.
