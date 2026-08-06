/*
Pattern Recognition Audit

File reviewed: src/contexts/intern-context.tsx

1. Is there any object that is created more than once but should be shared?
   → Possible Singleton? Yes.
   Reason: The intern data is shared across multiple components through the
   React Context. A Singleton-like service (or the existing Context provider)
   ensures there is a single source of truth for the application's intern data.

2. Is there any conditional block (if/else or switch) that creates different
   objects based on a type or string value?
   → Possible Factory? Yes.
   Reason: Intern objects are created from form data using createIntern().
   If different intern types (Frontend, Backend, Design, etc.) required
   different object structures or initialization logic, a Factory would be
   appropriate to create the correct type.

3. If a pattern applies: what would the refactored structure look like in one sentence?
   → Replace direct object creation with an InternFactory that returns the
   appropriate Intern object based on the selected role, while keeping a single
   shared service for managing intern data.

4. If no pattern applies: what is missing that would make the pattern unnecessary
   complexity here?
   → The current application creates only one type of Intern object and the
   creation logic is simple, so introducing multiple Factory classes would add
   unnecessary complexity unless different intern types require different
   behaviors in the future.
*/
// Task 3.1 — Combining Singleton and Factory Patterns
//
// Reflection:
// The three report generators are separate objects, but they all write to the
// same Logger instance because Logger is implemented as a Singleton.
//
// Without the Singleton pattern, each report generator would need a Logger
// object to be passed into its constructor or generate() method. Every place
// that creates a report generator would also need to create or pass the same
// Logger instance manually. Singleton removes that responsibility by providing
// one globally shared Logger.

interface ReportGenerator {
  generate(data: Record<string, unknown>[]): string;
}

// ---------------- Singleton ----------------

class Logger {
  private static instance: Logger | null = null;
  private logs: string[] = [];

  private constructor() {}

  public static getInstance(): Logger {
    if (Logger.instance === null) {
      Logger.instance = new Logger();
    }

    return Logger.instance;
  }

  public log(message: string): void {
    const entry = `[${new Date().toISOString()}] ${message}`;
    this.logs.push(entry);
    console.log(entry);
  }

  public getLogs(): string[] {
    return [...this.logs];
  }
}

// ---------------- Factory Products ----------------

class CSVReportGenerator implements ReportGenerator {
  generate(data: Record<string, unknown>[]): string {
    Logger.getInstance().log(
      `CSVReportGenerator: generated report with ${data.length} rows`,
    );

    if (data.length === 0) {
      return "";
    }

    const headers = Object.keys(data[0]).join(",");
    const rows = data.map((row) => Object.values(row).join(","));

    return [headers, ...rows].join("\n");
  }
}

class JSONReportGenerator implements ReportGenerator {
  generate(data: Record<string, unknown>[]): string {
    Logger.getInstance().log(
      `JSONReportGenerator: generated report with ${data.length} rows`,
    );

    return JSON.stringify(data, null, 2);
  }
}

class HTMLReportGenerator implements ReportGenerator {
  generate(data: Record<string, unknown>[]): string {
    Logger.getInstance().log(
      `HTMLReportGenerator: generated report with ${data.length} rows`,
    );

    if (data.length === 0) {
      return "<table></table>";
    }

    const rows = data
      .map(
        (row) =>
          `<tr>${Object.values(row)
            .map((value) => `<td>${value}</td>`)
            .join("")}</tr>`,
      )
      .join("");

    return `<table>${rows}</table>`;
  }
}

// ---------------- Factory ----------------

function createReportGenerator(format: string): ReportGenerator {
  switch (format.toLowerCase()) {
    case "csv":
      return new CSVReportGenerator();

    case "json":
      return new JSONReportGenerator();

    case "html":
      return new HTMLReportGenerator();

    default:
      throw new Error(
        `createReportGenerator: unknown format '${format}', expected one of: csv, json, html`,
      );
  }
}

// ---------------- Test ----------------

const data = [
  { name: "Alice", score: 91, department: "Backend" },
  { name: "Bob", score: 84, department: "Frontend" },
];

const csv = createReportGenerator("csv");
const json = createReportGenerator("json");
const html = createReportGenerator("html");

console.log("\nCSV Report:");
console.log(csv.generate(data));

console.log("\nJSON Report:");
console.log(json.generate(data));

console.log("\nHTML Report:");
console.log(html.generate(data));

console.log("\nAll Logger Entries:");
console.log(Logger.getInstance().getLogs());
