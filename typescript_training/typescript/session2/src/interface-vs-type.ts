interface PaginationResponse<T> {
  page: number;
  pageSize: number;
  total: number;
  data: T[];
}

const users: PaginationResponse<string> = {
  page: 1,
  pageSize: 10,
  total: 25,
  data: ["Alice", "Bob", "Charlie"],
};

type StringOrStringArray = string | string[];
let tags: StringOrStringArray = "TypeScript";
tags = ["JavaScript", "TypeScript"];
interface Notification {
  id: string;
  message: string;
}

interface EmailNotification extends Notification {
  email: string;
}

interface PushNotification extends Notification {
  deviceId: string;
}

const email: EmailNotification = {
  id: "N001",
  message: "Welcome!",
  email: "alice@example.com",
};

const push: PushNotification = {
  id: "N002",
  message: "New update available",
  deviceId: "DEVICE123",
};
type NumberProcessor = (value: number) => void;

const printNumber: NumberProcessor = (value) => {
  console.log(value);
};

printNumber(100);
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
const method: HttpMethod = "GET";

console.log(users);
console.log(tags);
console.log(email);
console.log(push);
console.log(method);
