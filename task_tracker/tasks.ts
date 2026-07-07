// -------------------------
// Task Interface
// -------------------------

export interface Task {
  id: number;
  name: string;
  priority: "Low" | "Medium" | "High";
  dueDate: string;
  done: boolean;
}

// -------------------------
// Task Array
// -------------------------

const tasks: Task[] = [];

// -------------------------
// Typed Functions
// -------------------------

export function addTask(
  name: string,
  priority: "Low" | "Medium" | "High",
  dueDate: string,
): Task {
  const task: Task = {
    id: Date.now(),
    name,
    priority,
    dueDate,
    done: false,
  };

  tasks.push(task);

  return task;
}

export function toggleDone(id: number): void {
  const task = tasks.find((t) => t.id === id);

  if (task) {
    task.done = !task.done;
  }
}

// -------------------------
// Task Manager Class
// -------------------------

export class TaskManager {
  private tasks: Task[] = [];

  constructor() {
    this.load();
  }

  add(data: Omit<Task, "id" | "done">): Task {
    const task: Task = {
      id: Date.now(),
      done: false,
      ...data,
    };

    this.tasks.push(task);

    this.save();

    return task;
  }

  getAll(): Task[] {
    return this.tasks;
  }

  toggle(id: number): void {
    const task = this.tasks.find((t) => t.id === id);

    if (task) {
      task.done = !task.done;
      this.save();
    }
  }

  filter(status: "all" | "done" | "pending"): Task[] {
    switch (status) {
      case "done":
        return this.tasks.filter((t) => t.done);

      case "pending":
        return this.tasks.filter((t) => !t.done);

      default:
        return this.tasks;
    }
  }

  sortBy(field: keyof Pick<Task, "priority" | "dueDate">): Task[] {
    const sorted = [...this.tasks];

    if (field === "priority") {
      const order = {
        High: 1,
        Medium: 2,
        Low: 3,
      };

      sorted.sort((a, b) => order[a.priority] - order[b.priority]);
    } else {
      sorted.sort(
        (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
      );
    }

    return sorted;
  }

  private save(): void {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  load(): void {
    const data = localStorage.getItem("tasks");

    if (data) {
      this.tasks = JSON.parse(data);
    }
  }
}

// -------------------------
// Generic groupBy
// -------------------------

export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce(
    (groups, item) => {
      const value = String(item[key]);

      if (!groups[value]) {
        groups[value] = [];
      }

      groups[value].push(item);

      return groups;
    },
    {} as Record<string, T[]>,
  );
}
