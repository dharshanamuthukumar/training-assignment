// Task 1.1 — Logger Singleton
// Reflection:
// If the private constructor were removed, anyone could create multiple Logger
// objects using `new Logger()`. That would break the Singleton pattern because
// logs would be stored in different instances instead of one shared buffer.
// The breakage could be detected by checking that `Logger.getInstance() === new Logger()`
// is false (or by observing different log buffers). With a private constructor,
// TypeScript prevents creating Logger instances outside the class.

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

// Expected usage
const a = Logger.getInstance();
const b = Logger.getInstance();

a.log("system started");
b.log("request received");

console.log(a === b); // true
console.log(a.getLogs().length); // 2
// Task 1.3 — Testing the Singleton

function testLoggerStartsEmpty() {
  const logger = Logger.getInstance();

  logger.log("left over from a previous operation");

  const fresh = Logger.getInstance();

  console.log("Logs should be empty:", fresh.getLogs());
}

function testLoggerCountsCorrectly() {
  const logger = Logger.getInstance();

  logger.log("entry one");

  console.log("Expected 1 log, got:", logger.getLogs().length);
}

testLoggerStartsEmpty();
testLoggerCountsCorrectly();

/*
Reflection:
The second test produced the wrong result because Logger is a Singleton.
Both tests share the same Logger instance, so log messages created in the
first test remain in memory during the second test.

This breaks test isolation because each test should start with a clean,
independent state. Shared state causes tests to influence one another,
making failures difficult to diagnose.

In a real test suite, I would add a method such as:

    clearLogs(): void

or a test-only reset method to empty the internal log buffer before each
test. This ensures every test starts from a known state and remains
independent and repeatable.
*/