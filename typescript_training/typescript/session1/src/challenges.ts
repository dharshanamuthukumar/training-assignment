// Challenge 1
// Helper function with return type 'never'
function throwError(message: string): never {
  throw new Error(message);
}

// Calculate discount
function calculateDiscount(price: number, discountPercent?: number): number {
  // No discount provided
  if (discountPercent === undefined) {
    return price;
  }

  // Invalid discount
  if (discountPercent >= 100) {
    throwError("Discount cannot be 100% or more.");
  }

  // Calculate final price
  return price - (price * discountPercent) / 100;
}

// Test
console.log(calculateDiscount(1000));
console.log(calculateDiscount(1000, 20));
// console.log(calculateDiscount(1000, 100)); // Throws an error

// Challenge 2

function formatUserList(users: [string, number][]): string[] {
  return users.map(([name, age]) => `${name} (${age} years)`);
}

// Test
const users: [string, number][] = [
  ["Alice", 30],
  ["Bob", 25],
  ["Charlie", 40],
];

console.log(formatUserList(users));

// Challenge 3

function findFirst(items: string[], searchTerm: string): string | undefined {
  return items.find((item) => item === searchTerm);
}

// Test
const fruits = ["Apple", "Banana", "Cherry"];

console.log(findFirst(fruits, "Banana"));
console.log(findFirst(fruits, "Orange"));
