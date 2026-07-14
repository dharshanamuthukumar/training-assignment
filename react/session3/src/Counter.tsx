import { useState } from "react";

function Counter() {
  const [count, setCount] = useState<number>(0);

  // We cannot write count = count + 1 because count is a state value.
  // React does not detect direct changes to state variables.
  // We must use setCount() so React knows the state has changed and
  // re-renders the component with the updated value.

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

export default Counter;
