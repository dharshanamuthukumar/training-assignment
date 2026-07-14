import { useState, useEffect } from "react";

function LiveTimer() {
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    // Cleanup function:
    // The cleanup clears the interval when the component unmounts.
    // Without this cleanup, the interval continues running in the
    // background, causing multiple timers, memory leaks, and
    // unnecessary state updates.
    return () => clearInterval(timer);
  }, []);

  return <p>Live Timer: {seconds}s</p>;
}

function SelfLearning() {
  return (
    <div>
      <h2>Self Learning Tasks</h2>

      {/* 
      1. React.StrictMode

      Observation:
      In development mode, React.StrictMode intentionally renders
      components and runs useEffect (including its cleanup) twice.
      This helps detect side effects and missing cleanup functions.
      You may notice duplicate console.log messages or an effect
      appearing to run twice. This behavior happens only in
      development, not in the production build.
      */}

      {/* 
      2. useLayoutEffect vs useEffect

      useEffect runs after the browser has painted the updated UI.
      useLayoutEffect runs immediately after React updates the DOM
      but before the browser paints the screen.

      Use useEffect for most side effects such as data fetching,
      timers, and event listeners.
      Use useLayoutEffect when you need to measure or modify the DOM
      before the user sees it, preventing layout flickering.
      */}

      {/* 
      3. State update inside useEffect without a dependency array

      If useEffect has no dependency array, it runs after every render.
      If the effect updates state, React renders the component again.
      After that render, the effect runs again, updates the state again,
      and this repeats continuously, creating an infinite render loop.
      */}

      {/* 
      4. useReducer vs useState

      useState is best for simple state such as numbers, strings,
      booleans, or small objects. useReducer is better for complex
      state with multiple related values or many update actions.
      A reducer keeps all update logic in one place, making the code
      easier to manage as applications become larger.
      */}

      {/* 
      5. Cleanup function in useEffect

      Cleanup functions remove resources created by an effect,
      such as timers, subscriptions, or event listeners.
      Without cleanup, these resources continue running even after
      the component unmounts, leading to memory leaks, duplicate
      event listeners, or multiple intervals running at the same time.
      */}

      <LiveTimer />
    </div>
  );
}

export default SelfLearning;
