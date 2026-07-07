// Interface for an invoice item
interface Item {
  price: number;
  quantity: number;
}

// Interface for a user
interface User {
  firstName: string;
  lastName: string;
  title?: string;
}

// Interface for a product
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
}

// Function 1
function calculateInvoiceTotal(items: Item[], taxRate: number): number {
  let total = 0;

  for (const item of items) {
    total += item.price * item.quantity;
  }

  const tax = total * taxRate;
  return total + tax;
}

// Function 2
function formatCurrency(amount: number, currencyCode: string): string {
  return currencyCode + amount.toFixed(2);
}

// Function 3
function getUserDisplayName(user: User): string {
  if (user.title) {
    return `${user.title} ${user.firstName} ${user.lastName}`;
  }

  return `${user.firstName} ${user.lastName}`;
}

// Function 4
function findProductByCategory(
  products: Product[],
  category: string,
): Product[] {
  return products.filter((p) => p.category === category);
}

// -----------------------
// Test Data
// -----------------------

const items: Item[] = [
  { price: 100, quantity: 2 },
  { price: 50, quantity: 3 },
];

console.log(calculateInvoiceTotal(items, 0.18));

console.log(formatCurrency(2500.5, "₹"));

const user: User = {
  title: "Dr.",
  firstName: "Alice",
  lastName: "Johnson",
};

console.log(getUserDisplayName(user));

const products: Product[] = [
  {
    id: "P1",
    name: "Laptop",
    category: "Electronics",
    price: 60000,
  },
  {
    id: "P2",
    name: "Chair",
    category: "Furniture",
    price: 3000,
  },
  {
    id: "P3",
    name: "Phone",
    category: "Electronics",
    price: 25000,
  },
];

console.log(findProductByCategory(products, "Electronics"));
