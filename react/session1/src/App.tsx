// import Greeting from "./Greeting";
// // A React component is a reusable function that returns JSX to display UI on the webpage.

// // Reusing components avoids repeating the same HTML.
// // If we need to change the UI, we only update the component once.
// function App() {
//   return (
//     <div>
//       <h1>Hello React</h1>
//       <Greeting />
//       <Greeting />
//       <Greeting />
//     </div>
//   );
// }

// export default App;
// // A React component is a reusable function that returns JSX to display UI on the webpage.
// //task 1.3
// import Greeting from "./Greeting";

// // Fragment groups multiple elements without adding an extra HTML element.
// // It keeps the DOM cleaner and is useful when a wrapper div is not needed.
// function App() {
//   return (
//     <>
//       <h1>Hello React</h1>
//       <Greeting />
//     </>
//   );
// }

// export default App;
//task 2.1
// import TsxRules from "./TsxRules";

// function App() {
//   return (
//     <>
//       <h1>Hello React</h1>
//       <TsxRules />
//     </>
//   );
// }

// export default App;
//task 2.2
// Inline styles in TSX use a JavaScript object, so CSS properties
// are written in camelCase (like fontSize) instead of kebab-case (font-size).
// import StyledCard from "./StyledCard";

// function App() {
//   return (
//     <>
//       <h1>Hello React</h1>
//       <StyledCard />
//     </>
//   );
// }

// export default App;
// //task 3.1
// import Profile from "./Profile";

// function App() {
//   return (
//     <>
//       <h1>Hello React</h1>
//       <Profile />
//     </>
//   );
// }

// export default App;
//task 3.2
// import SkillList from "./SkillList";

// function App() {
//   return (
//     <>
//       <h1>Hello React</h1>
//       <SkillList />
//     </>
//   );
// }

// export default App;
// // React requires a unique key for each list item so it can identify
// // which items have changed, been added, or removed. This helps React
// // update the UI efficiently and avoid unnecessary re-rendering.
// //task 4.1
// import ScoreCard from "./ScoreCard";

// function App() {
//   return (
//     <>
//       <h1>Hello React</h1>
//       <ScoreCard />
//     </>
//   );
// }

// export default App;
// //task 4.2
// import StatusBadge from "./StatusBadge";

// function App() {
//   return (
//     <>
//       <h1>Hello React</h1>
//       <StatusBadge />
//     </>
//   );
// }

// export default App;
//task 5.1
// import Dashboard from "./Dashboard";

// function App() {
//   return (
//     <>
//       <h1>Hello React</h1>
//       <Dashboard />
//     </>
//   );
// }

// export default App;
//Self-Learning
import SelfLearning from "./SelfLearning";

function App() {
  return (
    <>
      <h1>Hello React</h1>
      <SelfLearning />
    </>
  );
}

export default App;
