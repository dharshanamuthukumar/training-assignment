// ============================
// Task 2.1 - Strategy Pattern
// ============================

type Product = {
  name: string;
  price: number;
  rating: number;
  salesCount: number;
};

interface SortStrategy {
  sort(products: Product[]): Product[];
}

class SortByName implements SortStrategy {
  sort(products: Product[]): Product[] {
    return [...products].sort((a, b) => a.name.localeCompare(b.name));
  }
}

class SortByPrice implements SortStrategy {
  sort(products: Product[]): Product[] {
    return [...products].sort((a, b) => a.price - b.price);
  }
}

class SortByRating implements SortStrategy {
  sort(products: Product[]): Product[] {
    return [...products].sort((a, b) => b.rating - a.rating);
  }
}

class SortByPopularity implements SortStrategy {
  sort(products: Product[]): Product[] {
    return [...products].sort((a, b) => b.salesCount - a.salesCount);
  }
}

/*
Task 2.1 Comment

sort() should return a new array instead of modifying the original array.

If we sort the original array in place, every part of the application that
uses that array will see the modified order, which can introduce unexpected bugs.

Example:

const products = [
  { name: "Mouse", price: 899 },
  { name: "Keyboard", price: 2499 }
];

new SortByPrice().sort(products);

// If sort() modified the original array,
// products would now stay permanently sorted.
// Another feature expecting the original order would behave incorrectly.
*/

// ============================
// Task 2.2 - ProductCatalogue
// ============================

class ProductCatalogue {
  private strategy: SortStrategy;

  constructor(strategy: SortStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: SortStrategy): void {
    this.strategy = strategy;
  }

  sort(products: Product[]): Product[] {
    return this.strategy.sort(products);
  }
}

const products: Product[] = [
  {
    name: "Keyboard",
    price: 2499,
    rating: 4.3,
    salesCount: 1200,
  },
  {
    name: "Monitor",
    price: 18999,
    rating: 4.7,
    salesCount: 340,
  },
  {
    name: "Headset",
    price: 3499,
    rating: 4.1,
    salesCount: 870,
  },
  {
    name: "Webcam",
    price: 1999,
    rating: 3.9,
    salesCount: 2100,
  },
  {
    name: "Mouse",
    price: 899,
    rating: 4.5,
    salesCount: 3400,
  },
];

const catalogue = new ProductCatalogue(new SortByName());

console.log(
  "By name:",
  catalogue.sort(products).map((p) => p.name),
);

catalogue.setStrategy(new SortByPrice());

console.log(
  "By price:",
  catalogue.sort(products).map((p) => p.name),
);

catalogue.setStrategy(new SortByRating());

console.log(
  "By rating:",
  catalogue.sort(products).map((p) => p.name),
);

catalogue.setStrategy(new SortByPopularity());

console.log(
  "By popularity:",
  catalogue.sort(products).map((p) => p.name),
);

/*
Task 2.2 Comment

The sort() method on ProductCatalogue never changes.
Only the strategy object changes.

This shows that the interface provides a common contract.
ProductCatalogue simply calls strategy.sort() without knowing
which sorting algorithm is being used.

Without the Strategy Pattern, we would need a large if/else or
switch statement inside ProductCatalogue to decide which sorting
logic to execute.
*/

// ============================
// Task 2.3 - Add New Strategy
// ============================

class SortByPriceDesc implements SortStrategy {
  sort(products: Product[]): Product[] {
    return [...products].sort((a, b) => b.price - a.price);
  }
}

catalogue.setStrategy(new SortByPriceDesc());

console.log(
  "By price desc:",
  catalogue.sort(products).map((p) => p.name),
);

/*
Task 2.3 Comment

No existing strategy classes were modified.

ProductCatalogue also remained unchanged.

The only additions were:

1. New SortByPriceDesc class
2. One line to use the new strategy

If this had been implemented using a large if/else statement,
the existing ProductCatalogue class would have needed to be
modified to include another condition, increasing complexity.
*/

// ============================
// Task 2.4 - Function Strategies
// ============================

type SortFn = (products: Product[]) => Product[];

const sortByName: SortFn = (p) =>
  [...p].sort((a, b) => a.name.localeCompare(b.name));

const sortByPrice: SortFn = (p) => [...p].sort((a, b) => a.price - b.price);

function applySort(products: Product[], fn: SortFn): Product[] {
  return fn(products);
}

console.log("\nFunction-based strategies:");

console.log(
  "By name:",
  applySort(products, sortByName).map((p) => p.name),
);

console.log(
  "By price:",
  applySort(products, sortByPrice).map((p) => p.name),
);

console.log(
  "By rating inline:",
  applySort(products, (p) => [...p].sort((a, b) => b.rating - a.rating)).map(
    (p) => p.name,
  ),
);

/*
Task 2.4 Comment

Function-based strategies are suitable when the strategy is
simple and does not need to store any state.

Class-based strategies are preferred when:

- The strategy has configuration.
- The strategy maintains internal state.
- The strategy depends on other services.
- Multiple methods are required.

Example:

A DiscountStrategy may need tax rules, currency conversion,
or customer membership information. A simple function would
not be sufficient because it cannot easily encapsulate state
or dependencies like a class can.
*/
