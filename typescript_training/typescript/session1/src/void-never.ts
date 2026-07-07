function logEvent(event: string): void {
  console.log(`[LOG] ${event}`);
}
const result = logEvent("user_login");
console.log(result); // Output: undefined
function fail(message: string): never {
  throw new Error(message);
}

function doSomething(): void {
  return;
}

function runForever(): never {
  while (true) {
    console.log("Running...");
  }
}
/*
 void: function completes but does not return anything
 never: function never completes -ex:infinite loops
 */
