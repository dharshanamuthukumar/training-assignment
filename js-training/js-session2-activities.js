// 1. Observe the order of output

console.log("1");

setTimeout(() => console.log("2"), 1000);

console.log("3");

// Explanation:
// JavaScript executes synchronous code first.
// setTimeout schedules the callback to run later.
// So "1" prints, then "3" prints immediately.
// After 1 second, "2" prints.

// 2. Change timeout to 0ms

console.log("1");

setTimeout(() => console.log("2"), 0);

console.log("3");

// Explanation:
// Even with 0ms, setTimeout does not run immediately.
// The callback is placed in the Event Queue.
// JavaScript finishes the current code first.
// Therefore "2" still prints after "3".

// 3.My own example

console.log("Fetching data...");

setTimeout(() => {
  console.log("Data received!");
}, 2000);

// Output:
// Fetching data...
// (wait 2 seconds)
// Data received!

//activity 2
// 1. Handle Promise success and failure

const getData = new Promise((resolve, reject) => {
  const success = Math.random() > 0.5;

  setTimeout(() => {
    if (success) resolve("Data loaded!");
    else reject("Something went wrong");
  }, 1000);
});

getData
  .then((result) => {
    console.log("Success:", result);
  })
  .catch((error) => {
    console.log("Error:", error);
  });

// 2. Promise Chaining

const startValue = new Promise((resolve) => resolve(5));
startValue
  .then((num) => num * 2)
  .then((num) => num + 10)
  .then((result) => {
    console.log("Final Result:", result);
  });

// 3. Promise.all
const promise1 = new Promise((resolve) =>
  setTimeout(() => resolve("User loaded"), 1000),
);
const promise2 = new Promise((resolve) =>
  setTimeout(() => resolve("Orders loaded"), 1500),
);
Promise.all([promise1, promise2])
  .then((results) => {
    console.log(results);
  })
  .catch((error) => {
    console.log(error);
  });

//activity 3
// 1. Rewrite Promise chain using async/await

const getUser = async () => {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users/1",
    );
    const user = await response.json();

    console.log(user.name);
  } catch (error) {
    console.log(error);
  }
};

getUser();

// 2. getUserById(id)

const getUserById = async (id) => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`,
    );

    const user = await response.json();

    return {
      name: user.name,
      email: user.email,
    };
  } catch (error) {
    console.log(error);
  }
};

getUserById(3).then((result) => {
  console.log(result);
});

// 3. getAllUsers()

const getAllUsers = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    const users = await response.json();

    return users.map((user) => ({
      name: user.name,
      email: user.email,
    }));
  } catch (error) {
    console.log(error);
  }
};

getAllUsers().then((users) => {
  console.log(users);
});

// activity 4
// 1. Add try/catch

const fetchUser = async () => {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users/1",
    );

    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.log("Error:", error.message);
  }
};

fetchUser();

// Test:
// Change URL to something invalid like:
// https://jsonplaceholder.typicode.com/invalid

// 2. Detect 404 using response.ok

const fetchMissing = async () => {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users/99999",
    );

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.log("Caught:", error.message);
  }
};

fetchMissing();

// 3. Promise.allSettled

const fetchAll = async () => {
  const results = await Promise.allSettled([
    fetch("https://jsonplaceholder.typicode.com/users/1"),
    fetch("https://invalid-url-example.com/users"),
  ]);

  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      console.log(`Request ${index + 1} succeeded`);
    } else {
      console.log(`Request ${index + 1} failed`);
    }
  });
};

fetchAll();

// activity 5
// 1. Change title text

const title = document.getElementById("title");

title.textContent = "Hello, Intern!";

// 2. Change subtitle colour

const subtitle = document.getElementById("subtitle");

subtitle.style.color = "blue";

// 3. Increment counter

const counter = document.getElementById("counter");

const currentValue = Number(counter.textContent);

counter.textContent = currentValue + 1;

// 4. Render names in list

const names = ["Alice", "Bob", "Carol"];

const userList = document.getElementById("user-list");

names.forEach((name) => {
  const li = document.createElement("li");

  li.textContent = name;

  userList.appendChild(li);
});

// 5. Toggle class using classList

const toggleTitleClass = () => {
  title.classList.toggle("highlight");
};

toggleTitleClass();

// activity 6
// Select elements

const greetBtn = document.getElementById("greet-btn");
const addBtn = document.getElementById("add-btn");
const resetBtn = document.getElementById("reset-btn");

const nameInput = document.getElementById("name-input");
const greeting = document.getElementById("greeting");
const clickCount = document.getElementById("click-count");

let count = 0;

// Function to greet user

const greetUser = () => {
  const name = nameInput.value.trim();

  if (name === "") {
    greeting.textContent = "Please enter a name";
  } else {
    greeting.textContent = `Hello, ${name}!`;
  }
};

// 1. Greet button click

greetBtn.addEventListener("click", greetUser);

// 2. Add button

addBtn.addEventListener("click", () => {
  count++;
  clickCount.textContent = `Clicks: ${count}`;
});

// Reset button

resetBtn.addEventListener("click", () => {
  count = 0;
  clickCount.textContent = `Clicks: ${count}`;
});

// 3. Live input

nameInput.addEventListener("input", () => {
  const name = nameInput.value.trim();

  if (name === "") {
    greeting.textContent = "";
  } else {
    greeting.textContent = `Hello, ${name}!`;
  }
});

// 4. Enter key

nameInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    greetUser();
  }
});

//activity 7
const loadBtn = document.getElementById("load-btn");
const statusText = document.getElementById("status");
const usersContainer = document.getElementById("users-container");
const searchInput = document.getElementById("search");

let allUsers = [];

// Function to render users

const renderUsers = (users) => {
  usersContainer.innerHTML = "";

  users.forEach((user) => {
    const userDiv = document.createElement("div");

    userDiv.innerHTML = `
      <h3>${user.name}</h3>
      <p>Email: ${user.email}</p>
      <p>City: ${user.address.city}</p>
      <hr>
    `;

    usersContainer.appendChild(userDiv);
  });
};

// Load users button

loadBtn.addEventListener("click", async () => {
  try {
    statusText.textContent = "Loading...";

    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    const users = await response.json();

    allUsers = users;

    renderUsers(allUsers);

    statusText.textContent = `${users.length} users loaded`;
  } catch (error) {
    statusText.textContent = "Failed to load users. Try again.";

    usersContainer.innerHTML = "";
  }
});

// Search users

searchInput.addEventListener("input", () => {
  const searchText = searchInput.value.toLowerCase();

  const filteredUsers = allUsers.filter((user) =>
    user.name.toLowerCase().includes(searchText),
  );

  renderUsers(filteredUsers);
});

/*
Activity 8 Summary

1. Promise.all()
   - Runs multiple asynchronous requests at the same time.
   - Waits until all requests are completed.

2. createElement()
   - Creates HTML elements using JavaScript.
   - Safer than using innerHTML because it avoids unwanted HTML injection.

3. localStorage
   - Stores data in the browser permanently.
   - Data remains available even after refreshing or reopening the page.
   - Use JSON.stringify() to store objects and JSON.parse() to retrieve them.

4. AbortController
   - Used to cancel an ongoing fetch request.
   - Useful when the user no longer needs the result or wants to stop loading data.
*/
