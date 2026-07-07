// Function 1
function getFirstWord(sentence: string | null): string {
  // If sentence is null, calling split() would cause a runtime error.
  if (sentence === null) {
    return "";
  }

  // The first element could be undefined if the array is empty.
  return sentence.split(" ")[0] ?? "";
}

// Function 2
function getUserAge(user: { name: string; age?: number }): string {
  // If age is undefined, calling toString() would cause a runtime error.
  if (user.age !== undefined) {
    return `${user.name} is ${user.age.toString()} years old`;
  }

  return `${user.name}'s age is unknown`;
}

// Function 3
const config = {
  database: {
    host: "localhost",
    port: 5432,
  },
};

function getDbPort(): number {
  // database and port always exist, so this is safe.
  return config.database.port;
}

// Function 4
const users = ["Alice", "Bob", "Charlie"];

function findUser(name: string): string {
  const found = users.find((u) => u === name);

  // If no user is found, found will be undefined.
  if (found !== undefined) {
    return found.toUpperCase();
  }

  return "USER NOT FOUND";
}

// Test Cases
console.log(getFirstWord("Hello World"));
console.log(getFirstWord(null));

console.log(getUserAge({ name: "Alice", age: 25 }));
console.log(getUserAge({ name: "Bob" }));

console.log(getDbPort());

console.log(findUser("Alice"));
console.log(findUser("David"));

/*
Function 1:
Without checking for null, calling split() on null would cause a runtime error.

Function 2:
Without checking if age exists, calling toString() on undefined would cause a runtime error.

Function 3:
This function is safe because database and port always exist in the config object.

Function 4:
If no user is found, find() returns undefined.
Calling toUpperCase() on undefined would cause a runtime error.
*/
