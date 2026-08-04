// src/config.ts

const APP_NAME = "Intern Dashboard";

if (!APP_NAME.trim()) {
  throw new Error(
    "config: APP_NAME is required.\n" +
      "Example: const APP_NAME = 'Intern Dashboard'",
  );
}

export const config = {
  appName: APP_NAME,
};
// Task 6.2
// This configuration check runs at import time, when the module is first
// loaded by the application.
//
// Running the validation at import time follows the Fail Fast principle
// because configuration errors are detected immediately during startup,
// preventing the application from running with invalid or missing settings.
//
// If the check ran only on demand (at first use), the application could
// continue running until the configuration was accessed, making the error
// harder to diagnose and potentially causing failures later in execution.