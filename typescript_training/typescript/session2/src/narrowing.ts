function describe(value: string | number | boolean | null): string {
  if (value === null) {
    return "No value provided";
  }

  if (typeof value === "string") {
    return `String of length ${value.length}: ${value}`;
  }

  if (typeof value === "number") {
    return `Number: ${value.toFixed(2)}`;
  }

  return `Boolean: ${value}`;
}
console.log(describe("TypeScript"));
console.log(describe(12.3456));
console.log(describe(true));
console.log(describe(null));

interface Cat {
  meow(): void;
}

interface Dog {
  bark(): void;
}

function makeSound(animal: Cat | Dog): void {
  if ("meow" in animal) {
    animal.meow();
  } else {
    animal.bark();
  }
}
const cat: Cat = {
  meow() {
    console.log("Meow!");
  },
};

const dog: Dog = {
  bark() {
    console.log("Woof!");
  },
};

makeSound(cat);
makeSound(dog);
function summarise(input: string | number[] | { label: string }): string {
  if (typeof input === "string") {
    return `String: ${input}`;
  }

  if (Array.isArray(input)) {
    return `Array with ${input.length} numbers`;
  }

  return `Label: ${input.label}`;
}
console.log(summarise("Hello"));
console.log(summarise([10, 20, 30]));
console.log(summarise({ label: "Admin" }));

/*
------------------------------------------------------------
Explore: Discriminated Unions
------------------------------------------------------------

Instead of checking for methods using the 'in' operator,
we can add a common property called 'kind'.

Example:

interface Cat2 {
  kind: "cat";
  meow(): void;
}

interface Dog2 {
  kind: "dog";
  bark(): void;
}

type Animal = Cat2 | Dog2;

function makeAnimalSound(animal: Animal): void {
  if (animal.kind === "cat") {
    animal.meow();
  } else {
    animal.bark();
  }
}

Why are discriminated unions better?

- Every object has a common 'kind' property.
- TypeScript can automatically determine the correct type.
- It's safer and easier to maintain than checking if a property exists using the 'in' operator.
- If a new animal type is added, TypeScript can help ensure all cases are handled.
*/
