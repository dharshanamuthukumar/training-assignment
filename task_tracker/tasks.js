// -------------------------
// Task Interface
// -------------------------
// -------------------------
// Task Array
// -------------------------
const tasks = [];
// -------------------------
// Typed Functions
// -------------------------
export function addTask(name, priority, dueDate) {
    const task = {
        id: Date.now(),
        name,
        priority,
        dueDate,
        done: false,
    };
    tasks.push(task);
    return task;
}
export function toggleDone(id) {
    const task = tasks.find((t) => t.id === id);
    if (task) {
        task.done = !task.done;
    }
}
// -------------------------
// Task Manager Class
// -------------------------
export class TaskManager {
    tasks = [];
    constructor() {
        this.load();
    }
    add(data) {
        const task = {
            id: Date.now(),
            done: false,
            ...data,
        };
        this.tasks.push(task);
        this.save();
        return task;
    }
    getAll() {
        return this.tasks;
    }
    toggle(id) {
        const task = this.tasks.find((t) => t.id === id);
        if (task) {
            task.done = !task.done;
            this.save();
        }
    }
    filter(status) {
        switch (status) {
            case "done":
                return this.tasks.filter((t) => t.done);
            case "pending":
                return this.tasks.filter((t) => !t.done);
            default:
                return this.tasks;
        }
    }
    sortBy(field) {
        const sorted = [...this.tasks];
        if (field === "priority") {
            const order = {
                High: 1,
                Medium: 2,
                Low: 3,
            };
            sorted.sort((a, b) => order[a.priority] - order[b.priority]);
        }
        else {
            sorted.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
        }
        return sorted;
    }
    save() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }
    load() {
        const data = localStorage.getItem("tasks");
        if (data) {
            this.tasks = JSON.parse(data);
        }
    }
}
// -------------------------
// Generic groupBy
// -------------------------
export function groupBy(array, key) {
    return array.reduce((groups, item) => {
        const value = String(item[key]);
        if (!groups[value]) {
            groups[value] = [];
        }
        groups[value].push(item);
        return groups;
    }, {});
}
