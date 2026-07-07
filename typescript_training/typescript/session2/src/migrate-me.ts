// Interface for a User
interface User {
  id: string;
  name: string;
  email: string;
}

// Cache object
const cache: Record<string, User> = {};

// Fetch a user from the cache
function fetchUserFromCache(id: string): User | null {
  return cache[id] ?? null;
}

// Save a user to the cache
function saveUserToCache(user: User): void {
  cache[user.id] = user;
}

// Process users using filter and transform functions
function processUsers<T, U>(
  users: T[],
  filterFn: (user: T) => boolean,
  transformFn: (user: T) => U,
): U[] {
  return users.filter(filterFn).map(transformFn);
}

// Build a query string from an object
function buildQueryString(
  params: Record<string, string | number | boolean>,
): string {
  return Object.keys(params)
    .map((key) => `${key}=${encodeURIComponent(String(params[key]))}`)
    .join("&");
}

// Generic retry function
async function retry<T>(
  fn: () => Promise<T>,
  maxAttempts: number,
  delay: number,
): Promise<T> {
  let attempt = 0;

  while (attempt < maxAttempts) {
    try {
      return await fn();
    } catch (err) {
      attempt++;

      if (attempt >= maxAttempts) {
        throw err;
      }

      await new Promise<void>((resolve) => setTimeout(resolve, delay));
    }
  }

  // This line should never be reached
  throw new Error("Unexpected retry failure");
}

// Export all functions
export {
  fetchUserFromCache,
  saveUserToCache,
  processUsers,
  buildQueryString,
  retry,
};

// ----------------------------
// Test Code
// ----------------------------

// Save users
saveUserToCache({
  id: "1",
  name: "Alice",
  email: "alice@example.com",
});

saveUserToCache({
  id: "2",
  name: "Bob",
  email: "bob@example.com",
});

// Fetch user
console.log(fetchUserFromCache("1"));
console.log(fetchUserFromCache("3"));

// Process users
const users: User[] = [
  { id: "1", name: "Alice", email: "alice@example.com" },
  { id: "2", name: "Bob", email: "bob@example.com" },
  { id: "3", name: "Charlie", email: "charlie@example.com" },
];

const names = processUsers(
  users,
  (user) => user.id !== "2",
  (user) => user.name,
);

console.log(names);

// Query string
console.log(
  buildQueryString({
    search: "typescript",
    page: 1,
    active: true,
  }),
);

// Retry example
let count = 0;

retry(
  async () => {
    count++;

    if (count < 3) {
      throw new Error("Failed");
    }

    return "Success!";
  },
  5,
  1000,
)
  .then(console.log)
  .catch(console.error);
