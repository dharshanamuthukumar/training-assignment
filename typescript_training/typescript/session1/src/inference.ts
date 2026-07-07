let city = "Mumbai";
let year = 2024;
let country: string;
let population: number;
country = "India";
population = 1400000000;
let mystery;
mystery = "hello";
mystery = 42;

console.log(city);
console.log(year);
console.log(country);
console.log(population);
console.log(mystery);

// When TypeScript cannot infer a type and no type annotation is provided,
// it assigns the 'any' type. Variables of type 'any' can store values of
// any type, so TypeScript does not perform type checking on them.
