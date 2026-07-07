# Task Tracker

## Project Overview

Task Tracker is a simple web-based task management application developed using **HTML, CSS, JavaScript, and TypeScript**. It allows users to create, organize, filter, and manage daily tasks with different priority levels and due dates. The application also stores tasks in the browser using Local Storage so that they remain available after refreshing the page.

---

## Features

- Add new tasks with:
  - Task name
  - Priority (Low, Medium, High)
  - Due date
- Mark tasks as completed
- Filter tasks by:
  - All
  - Pending
  - Done
- Sort tasks by:
  - Priority
  - Due date
- Highlight overdue or today's tasks
- Display live task counter
- Group tasks by priority in the summary table
- Store tasks using Local Storage
- Restore tasks automatically after page refresh

---

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)
- TypeScript
- Local Storage API

---

## Project Structure

```
task_tracker/
│── index.html
│── style.css
│── main.js
│── tasks.ts
│── tasks.js
│── tsconfig.json
│── README.md
```

---

## How to Run the Project

### 1. Clone the repository

```bash
git clone <repository-url>
```

### 2. Open the project folder

```bash
cd task_tracker
```

### 3. Compile the TypeScript file

```bash
tsc
```

This generates the `tasks.js` file from `tasks.ts`.

### 4. Start a local server

Do **not** open `index.html` directly because the project uses JavaScript modules.

You can use one of the following methods:

#### Option A: Live Server (Recommended)

- Open the project in Visual Studio Code.
- Install the **Live Server** extension.
- Right-click `index.html`.
- Select **Open with Live Server**.

#### Option B: Python HTTP Server

```bash
python -m http.server 8000
```

Then open:

```
http://localhost:8000
```

---

## Usage

1. Enter the task name.
2. Select the priority.
3. Choose the due date.
4. Click **Add Task**.
5. Use the **Done** button to mark a task as completed.
6. Filter tasks using **All**, **Pending**, or **Done**.
7. Sort tasks by priority or due date.
8. Click **Clear All** to remove all stored tasks.

---

## TypeScript Concepts Used

- Interfaces
- Union Types
- Classes
- Access Modifiers (`private`)
- Generics
- Utility Types (`Omit`, `Pick`)
- Modules (`import` / `export`)

---

## JavaScript Concepts Used

- DOM Manipulation
- Event Handling
- Array Methods (`map`, `filter`, `sort`)
- Local Storage
- Template Literals
- ES6 Modules

---

## Future Improvements

- Edit existing tasks
- Delete individual tasks
- Search tasks
- Category support
- Responsive UI improvements
- Dark mode
- Drag-and-drop task ordering

---

## Author

**Dharshana M**
