function greetUser(name: string, title?: string): string {
  return title ? `Hello ${title} ${name}` : `Hello ${name}`;
}
console.log(greetUser("Alice"));
console.log(greetUser("Alice", "Dr."));
function createAccount(email: string, role: string = "user"): object {
  return { email, role };
}
console.log(createAccount("alice@example.com"));
console.log(createAccount("bob@example.com", "admin"));

/*
Difference between optional parameters and default parameters:

1. Optional parameter (?)
- The parameter may or may not be provided.
- If omitted, its value is undefined.

Example:
function greet(name?: string)

2. Default parameter (=)
- The parameter has a default value if no argument is provided.
- It is never undefined unless explicitly passed as undefined.

Example:
function greet(name: string = "Guest")

 an optional parameter can be used when the value is truly optional.
default parameter can be used when we want a predefined value if the user doesn't provide one.
*/
