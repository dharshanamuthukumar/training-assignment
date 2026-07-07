console.log("hello");
console.log("Hello");
//section 1
// 1. Variables for profile
const Name = "Dharshana";
let age = 20;
let Role = "intern";
let isAvailable = true;
// 2. Check types using typeof
console.log("name is a " + typeof Name);
console.log("age is a " + typeof age);
console.log("role is a " + typeof Role);
console.log("isAvailable is a " + typeof isAvailable);
// 3. Try reassigning a const
// Uncomment the line below to see the error
// name = "New Name";
// error shown:js-session1-assignment.js:19 Uncaught TypeError: Assignment to constant variable.
console.log(" ");

// Section 2 — Template Literals

console.log(`Hi, I'm ${Name} and I'm a ${Role}.`);
console.log(`Available: ${isAvailable}`);
console.log(`My name has ${Name.length} characters`);
console.log(" ");

// Section 3 — Arrow Functions
// 1. fullName(first, last)
const fullName = (first, last) => `${first} ${last}`;
console.log(fullName("Alice", "Johnson"));
// 2. isAdult(age)
const isAdult = (age) => age >= 18;
console.log(isAdult(21)); // true
console.log(isAdult(15)); // false
// 3. formatUser(user)
const formatUser = (user) => `${user.name} - ${user.role}`;
const user = {
  name: "Alice",
  role: "dev",
};
console.log(formatUser(user));
console.log(" ");

// Section 4 — Objects & Destructuring
const userDetails = {
  id: 1,
  name: "Alice",
  role: "dev",
  active: true,
  address: {
    city: "Mumbai",
    country: "India",
  },
};
// 1. Destructure name, role, active
const { name, role, active } = userDetails;
console.log(name);
console.log(role);
console.log(active);
// 2. Destructure city from nested address object
const {
  address: { city },
} = userDetails;
console.log(city);
// 3. Create updatedUser with active = false
const updatedUser = {
  ...userDetails,
  active: false,
};
console.log(updatedUser);
console.log(" ");

// Section 5 — Arrays & Spread
const devs = ["Alice", "Carol"];
const designers = ["Bob", "Dan"];
// 1. Combine arrays using spread
const team = [...devs, ...designers];
console.log(team);
// 2. Add "Eve" without changing original arrays
const updatedTeam = [...team, "Eve"];
console.log(updatedTeam);
// 3. Destructure first and second member
const [firstMember, secondMember] = team;
console.log(firstMember);
console.log(secondMember);
console.log(" ");

// Section 6 — Array map & filter
const users = [
  { id: 1, name: "Alice", role: "dev", active: true },
  { id: 2, name: "Bob", role: "design", active: false },
  { id: 3, name: "Carol", role: "dev", active: true },
  { id: 4, name: "Dan", role: "design", active: true },
  { id: 5, name: "Eve", role: "dev", active: false },
];
// 1. Get names of all active users
const activeUserNames = users
  .filter((user) => user.active)
  .map((user) => user.name);
console.log(activeUserNames);
// 2. Get all users with role "dev"
const devUsers = users.filter((user) => user.role === "dev");
console.log(devUsers);
// 3. Create formatted strings
const userDescriptions = users.map((user) => `${user.name} is a ${user.role}`);
console.log(userDescriptions);
// 4. Get names of active devs only
const activeDevNames = users
  .filter((user) => user.active && user.role === "dev")
  .map((user) => user.name);
console.log(activeDevNames);
console.log(" ");

// Section 7 — Array Functions
// 1. reduce — count users per role
const userCountByRole = users.reduce((count, user) => {
  count[user.role] = (count[user.role] || 0) + 1;
  return count;
}, {});
console.log(userCountByRole);
// 2. find — first active user with role "design"
const activeDesigner = users.find(
  (user) => user.active && user.role === "design",
);
console.log(activeDesigner);
// 3. some — is any user inactive?
const hasInactiveUsers = users.some((user) => !user.active);
console.log(hasInactiveUsers);
// 4. every — do all users have a role defined?
const allUsersHaveRole = users.every((user) => user.role);
console.log(allUsersHaveRole);
console.log(" ");

// Section 8 — Spot & Fix the Bugs
// 1. Loose equality trap
const input = "5";
const score = 5;
// Wrong:
// if (input == score)
// Fixed:
if (input === score) {
  console.log("match");
}

// Explanation:
// == compares only values after type conversion.
// "5" == 5 becomes true because JavaScript converts "5" to 5.
// === compares both value and type.
// "5" !== 5, so this condition is false.

// 2. Missing return in arrow function
// Wrong:
// const doubled = [1, 2, 3].map(n => {
//     n * 2;
// });

// Fixed:
const doubled = [1, 2, 3].map((n) => {
  return n * 2;
});

console.log(doubled);

// Another shorter way:
// const doubled = [1, 2, 3].map(n => n * 2);

// Explanation:
// When using {} in an arrow function, you must explicitly return a value.
// Without return, each iteration returns undefined.

// 3. Mutating original array

const original = [1, 2, 3];

// Wrong:
// original.push(4);

// Fixed:
const newArray = [...original, 4];

console.log(original);
console.log(newArray);

// Explanation:
// push() changes the original array.
// Spread (...) creates a new array without modifying the original.

// 4. const object reassignment confusion

const user1 = {
  name: "Alice",
  active: true,
};

// This is allowed:
user1.active = false;

console.log(user1);

// Explanation:
// const prevents reassigning the variable itself.
// It does NOT make the object immutable.
// Object properties can still be changed.

// This causes an error:
// user = { name: "Bob" };

// Error:
// TypeError: Assignment to constant variable.

// Explanation:
// Here we are trying to replace the entire object.
// const variables cannot be reassigned.
console.log(" ");

// Section 9 — Things to Be Aware Of

// 1. Case Sensitivity

const Username = "Alice";
const username = "Bob";

console.log(Username);
console.log(username);

// Explanation:
// JavaScript is case-sensitive.
// Username and username are two different variables.

// 2. undefined vs null

const a = null;
const b = undefined;
console.log(typeof a);
console.log(typeof b);

// Explanation:
// null = intentionally empty value
// undefined = value not assigned yet

// 3. Call Order Matters
const greet = (name) => `Hello, ${name}`;
console.log(greet("Alice"));

// 4. Semicolons
const x = 10;
const y = 20;

// Explanation:
// JavaScript can automatically insert semicolons (ASI),
// but most teams prefer writing semicolons explicitly.
// Choose one style and use it consistently throughout the file.
