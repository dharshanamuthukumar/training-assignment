interface User {
  readonly id: number;
  name: string;
  email: string;
  age?: number;
  role: "admin" | "editor" | "viewer";
}
const adminUser: User = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  age: 30,
  role: "admin",
};
const editorUser: User = {
  id: 2,
  name: "Bob",
  email: "bob@example.com",
  role: "editor",
};
const viewerUser: User = {
  id: 3,
  name: "Charlie",
  email: "charlie@example.com",
  age: 25,
  role: "viewer",
};

const invalidUser: User = {
  id: 4,
  name: "David",
  email: "david@example.com",
  role: "viewer",
};

//  Task 3 - Intentional error
// adminUser.id = 10;

/*
readonly prevents important properties like 'id' from being modified
after the object is created. This helps maintain data integrity and
allows TypeScript to catch accidental changes during development
instead of relying only on developers to remember not to modify them.
*/
