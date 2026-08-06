// Task 1.2 — ConfigManager Singleton
// Reflection:
// Returning an empty string for a missing key would be a silent failure because
// the program would continue running with an invalid configuration, making the
// root cause harder to identify. Throwing an error follows the Fail Fast
// principle by immediately reporting the problem, making it easier to detect
// and fix configuration mistakes.

class ConfigManager {
  private static instance: ConfigManager | null = null;
  private config: Record<string, string> = {};

  private constructor() {
    this.config["env"] = "development";
    this.config["appName"] = "Intern Dashboard";
    this.config["version"] = "1.0.0";
  }

  public static getInstance(): ConfigManager {
    if (ConfigManager.instance === null) {
      ConfigManager.instance = new ConfigManager();
    }

    return ConfigManager.instance;
  }

  public set(key: string, value: string): void {
    this.config[key] = value;
  }

  public get(key: string): string {
    const value = this.config[key];

    if (value === undefined) {
      throw new Error(`Configuration key '${key}' does not exist.`);
    }

    return value;
  }
}

// Example usage
const config = ConfigManager.getInstance();
config.set("apiUrl", "http://localhost:3001");

const sameConfig = ConfigManager.getInstance();

console.log(sameConfig.get("apiUrl")); // http://localhost:3001
console.log(config === sameConfig); // true
