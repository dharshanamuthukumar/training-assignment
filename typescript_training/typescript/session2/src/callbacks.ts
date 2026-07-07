type Predicate<T> = (value: T) => boolean;
type Transform<T, U> = (value: T) => U;
type EventHandler = (eventName: string, payload: unknown) => void;
function filter<T>(items: T[], predicate: Predicate<T>): T[] {
  return items.filter(predicate);
}
function transform<T, U>(items: T[], fn: Transform<T, U>): U[] {
  return items.map(fn);
}
const handleEvent: EventHandler = (eventName, payload) => {
  console.log(`Event: ${eventName}`);
  console.log("Payload:", payload);
};

handleEvent("login", { user: "Alice" });
const numbers = [1, 2, 3, 4, 5];
const evenNumbers = filter(numbers, (num) => num % 2 === 0);
const numberStrings = transform(numbers, (num) => num.toString());

console.log("Even Numbers:", evenNumbers);
console.log("Number Strings:", numberStrings);
