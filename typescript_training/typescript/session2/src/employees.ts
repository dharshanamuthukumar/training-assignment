// Step 1: Base interface
interface Person {
  firstName: string;
  lastName: string;
  email: string;
}

// Step 2: Employee extends Person
interface Employee extends Person {
  readonly employeeId: string;
  department: string;
  startDate: Date;
}

// Step 3: Manager extends Employee
interface Manager extends Employee {
  teamSize: number;
  directReports: string[];
}

// Step 4: Function that accepts a Person
function getFullName(person: Person): string {
  return `${person.firstName} ${person.lastName}`;
}

// Step 5: Function that accepts an Employee
function introduceEmployee(employee: Employee): string {
  return `Hi, I am ${getFullName(employee)} from ${employee.department}, joined on ${employee.startDate.toLocaleDateString()}`;
}

// ----------------------
// Test Objects
// ----------------------

// Person object
const person: Person = {
  firstName: "John",
  lastName: "Smith",
  email: "john@example.com",
};

// Employee object
const employee: Employee = {
  firstName: "Alice",
  lastName: "Johnson",
  email: "alice@example.com",
  employeeId: "EMP001",
  department: "Engineering",
  startDate: new Date("2024-01-01"),
};

// Manager object
const manager: Manager = {
  firstName: "Robert",
  lastName: "Brown",
  email: "robert@example.com",
  employeeId: "EMP002",
  department: "Engineering",
  startDate: new Date("2023-05-10"),
  teamSize: 5,
  directReports: ["EMP003", "EMP004", "EMP005"],
};

// Testing getFullName()
console.log(getFullName(person));
console.log(getFullName(employee));
console.log(getFullName(manager));

// Testing introduceEmployee()
console.log(introduceEmployee(employee));
console.log(introduceEmployee(manager));

/*
Why does getFullName() accept Person, Employee, and Manager?

Employee extends Person, so every Employee has all the properties of a Person.
Manager extends Employee, so every Manager also has all the properties of a Person.
Therefore, both Employee and Manager can be used wherever a Person is expected.
*/
