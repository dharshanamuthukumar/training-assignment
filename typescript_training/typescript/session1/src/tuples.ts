const userRecord: [string, number, boolean] = ["Alice", 30, true];

console.log(userRecord[0].toUpperCase()); // string method
console.log(userRecord[1].toFixed(2)); // number method
console.log(userRecord[2].toString()); // boolean method

const wrongOrder: [string, number, boolean] = ["Alice", 30, true];
const coordinates: [number, number] = [19.076, 72.877];
/*
A tuple has a fixed number of elements and each position has a specific type.
If we create a tuple with more elements than defined, TypeScript reports an error.
Although the push() method may allow adding extra elements in some cases,
the tuple's declared type still only recognizes the original positions.
*/
