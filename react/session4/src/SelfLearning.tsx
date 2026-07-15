// ===========================================================
// SELF LEARNING TASKS
// ===========================================================

// -----------------------------------------------------------
// 1. React.memo
// -----------------------------------------------------------

// React.memo is a higher-order component that prevents a component
// from re-rendering if its props have not changed. It performs a
// shallow comparison of the previous and new props. If the props are
// the same, React reuses the previous rendered output.
//
// React.memo works well with useCallback because useCallback keeps
// function props stable across renders. Without useCallback, a new
// function is created on every render, causing React.memo to detect
// changed props and re-render the child unnecessarily.
//
// Example:
//
// const InternRow = React.memo(function InternRow(props) {
//     ...
// });

// -----------------------------------------------------------
// 2. When NOT to use useMemo and useCallback
// -----------------------------------------------------------

// Example 1:
// Do not use useMemo for very cheap calculations.
//
// Example:
// const total = a + b;
//
// Wrapping this in useMemo adds unnecessary memory usage and dependency
// tracking, making the code more complex than simply recalculating it.

// Example 2:
// Do not use useCallback for event handlers that are not passed to
// memoized child components.
//
// Example:
//
// const handleClick = useCallback(() => {
//     console.log("Clicked");
// }, []);
//
// If the callback is only used inside the current component,
// useCallback provides little or no performance benefit while making
// the code harder to read.

// -----------------------------------------------------------
// 3. useReducer Version of useCounter
// -----------------------------------------------------------

import { useReducer } from "react";

interface CounterState {
  count: number;
}

type CounterAction =
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "reset" };

function reducer(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };

    case "decrement":
      return { count: state.count - 1 };

    case "reset":
      return { count: 0 };

    default:
      return state;
  }
}

function useCounterReducer() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return {
    count: state.count,
    increment: () => dispatch({ type: "increment" }),
    decrement: () => dispatch({ type: "decrement" }),
    reset: () => dispatch({ type: "reset" }),
  };
}

// useReducer is preferable when state transitions are complex,
// involve multiple related values, or when many actions update
// the same state. It centralizes update logic inside a reducer,
// making the code easier to maintain than using multiple useState
// hooks.

// -----------------------------------------------------------
// 4. Zustand / Redux Toolkit vs Context API
// -----------------------------------------------------------

// Context API with useState is suitable for small to medium-sized
// applications where only a few pieces of global state need to be
// shared, such as themes, authentication, or user preferences.
//
// Zustand and Redux Toolkit are better choices for large applications
// with complex shared state, many independent updates, asynchronous
// operations, or advanced debugging requirements. They provide better
// scalability, predictable state updates, middleware support, and
// developer tools. Context is simpler and built into React, while
// Zustand and Redux Toolkit offer more powerful state management for
// enterprise-scale applications.

export {};
