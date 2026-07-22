import "./App.css";
import Counter from "./Counter";
import StateTypes from "./StateTypes";
import InternForm from "./InternForm";
import TogglePanel from "./TogglePanel";
import InternObjectForm from "./InternObjectForm";
import InternList from "./InternList";
import InternLoader from "./InternLoader";
import FilteredInterns from "./FilteredInterns";
import EscapeHandler from "./EscapeHandler";
import FocusInput from "./FocusInput";
import RefVsState from "./RefVsState";
import StopwatchRef from "./StopwatchRef";
import Dashboard from "./Dashboard";
import SelfLearning from "./SelfLearning";
function App() {
  return (
    <>
      <h1>React Session 3</h1>

      <Counter />

      <hr />

      <StateTypes />

      <hr />

      <InternForm />

      <hr />

      <TogglePanel />

      <hr />

      <InternObjectForm />
      <hr />

      <InternList />

      <hr />

      <InternLoader />

      <hr />

      <FilteredInterns />
      <hr />

      <EscapeHandler />
      <hr />

      <EscapeHandler />

      <hr />

      <FocusInput />
      <hr />

      <FocusInput />

      <hr />

      <RefVsState />
      <hr />

      <StopwatchRef />
      <hr />

      <Dashboard />

      <hr />

      <SelfLearning />
    </>
  );
}

export default App;
