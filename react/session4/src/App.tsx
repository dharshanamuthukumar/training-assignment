import "./App.css";
import Navbar from "./components/Navbar";
import ScoreStats from "./components/ScoreStats";
import AddInternForm from "./components/AddInternForm";
import InternSearch from "./components/InternSearch";
import InternListWithCallback from "./components/InternListWithCallback";
import { useInterns } from "./contexts/intern-context";

// Application Architecture:
// Contexts: Store and share global application state such as theme and intern data.
// Hooks: Contain reusable stateful logic like form handling, searching, and counters.
// Components: Build the user interface by consuming data from contexts and hooks.

function App() {
  const { isLoading } = useInterns();

  if (isLoading) {
    return <p style={{ padding: "16px" }}>Loading interns...</p>;
  }

  return (
    <div>
      <Navbar />

      <div style={{ padding: "16px" }}>
        <ScoreStats />

        <AddInternForm />

        <InternSearch />

        <InternListWithCallback />
      </div>
    </div>
  );
}

export default App;
