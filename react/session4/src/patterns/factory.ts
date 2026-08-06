// Task 2.1 — Factory Pattern
// Reflection:
// The caller only depends on the ReportGenerator interface and the
// createReportGenerator() factory. This reduces coupling because the caller
// does not need to know which concrete class is being created.
//
// Without the factory, the caller would need code such as:
//
// if (format === "csv") new CSVReportGenerator()
// else if (format === "json") new JSONReportGenerator()
// else if (format === "html") new HTMLReportGenerator()
// ...
//
// As more formats are added, every caller would need to be modified.
// With the factory, only the factory function changes.

interface ReportGenerator {
  generate(data: Record<string, unknown>[]): string;
}

class CSVReportGenerator implements ReportGenerator {
  generate(data: Record<string, unknown>[]): string {
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
    return JSON.stringify(data, null, 2);
  }
}

class HTMLReportGenerator implements ReportGenerator {
  generate(data: Record<string, unknown>[]): string {
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

// Test data
const data = [
  { name: "Alice", score: 91, department: "Backend" },
  { name: "Bob", score: 84, department: "Frontend" },
];

const csv = createReportGenerator("csv");
const json = createReportGenerator("json");
const html = createReportGenerator("html");

console.log("----- CSV -----");
console.log(csv.generate(data));

console.log("\n----- JSON -----");
console.log(json.generate(data));

console.log("\n----- HTML -----");
console.log(html.generate(data));
