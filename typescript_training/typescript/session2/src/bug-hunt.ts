interface Product {
  id: string;
  name: string;
  price: number;
  tags: string[];
  discount?: number;
}

// Bug 1
function applyDiscount(product: Product): number {
  // Without checking, discount could be undefined.
  // Subtracting undefined results in NaN at runtime.
  return product.price - (product.discount ?? 0);
}

// Bug 2
function getTagSummary(product: Product): string {
  // The correct method name is toUpperCase().
  // Using toUppercase() would cause a runtime error because the method doesn't exist.
  return product.tags.join(", ").toUpperCase();
}

// Bug 3
function createProduct(name: string, price: number): Product {
  // Adding parameter types prevents passing incorrect values.
  return {
    id: Math.random().toString(),
    name: name,
    price: price,
    tags: [],
  };
}

// Bug 4
function findCheapest(products: Product[]): Product | undefined {
  // If the array is empty, sorted[0] is undefined.
  // Returning Product | undefined makes this explicit.
  const sorted = [...products].sort((a, b) => a.price - b.price);
  return sorted[0];
}

// Bug 5
function printProduct(product: Product): void {
  console.log(`${product.name} costs ₹${product.price}`);

  // A void function should not return a value.
  return;
}

// ----------------------
// Test Cases
// ----------------------

const laptop = createProduct("Laptop", 60000);

const mouse: Product = {
  id: "P002",
  name: "Mouse",
  price: 1000,
  tags: ["electronics", "accessory"],
  discount: 100,
};

console.log("Discounted Price:", applyDiscount(mouse));

console.log("Tags:", getTagSummary(mouse));

const products: Product[] = [laptop, mouse];

const cheapest = findCheapest(products);

if (cheapest) {
  console.log("Cheapest Product:", cheapest.name);
}

printProduct(mouse);

/*
Bug 1:
Without checking if discount exists, subtracting undefined
would produce NaN.

Bug 2:
Using toUppercase() (incorrect spelling) would cause a
TypeError because the method doesn't exist.

Bug 3:
Without parameter types, name and price become implicit any,
allowing incorrect argument types.

Bug 4:
If the array is empty, sorted[0] is undefined.
Returning Product would be incorrect and could cause runtime errors.

Bug 5:
A function returning void should not return a value.
Returning product.name causes a TypeScript error because the
function is meant only to perform an action.
*/
