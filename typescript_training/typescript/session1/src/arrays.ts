const fruits: string[] = ["apple", "banana", "cherry"];
const temperatures: number[] = [22.5, 19.0, 30.1];
const flags: boolean[] = [true, false, true];
fruits.push("grapes");
temperatures.push(32.4);
const mixed: (string | number)[] = ["Alice", 1, "Bob", 2];
mixed.push(3);

/*
string[] and Array<string> represent the same type.
They are interchangeable and both define an array of strings.
The only difference is syntax:
- string[] is shorter and more commonly used.
- Array<string> uses generic syntax and is useful for more complex types.
*/
