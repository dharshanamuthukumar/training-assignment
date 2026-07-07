function add(a: number, b: number): number {
  return a + b;
}

console.log(add(2, 3));

// The type annotations are removed during transpilation because JavaScript does not support types.
// TypeScript uses them only for type checking during development.
