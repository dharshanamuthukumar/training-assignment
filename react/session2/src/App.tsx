// import "./App.css";
// import InternCard from "./InternCard";

// function App() {
//   return (
//     <div>
//       <InternCard name="Rahul" score={92} isPresent={true} />
//       <InternCard name="Priya" score={78} isPresent={true} />
//       <InternCard name="Amit" score={45} isPresent={false} />
//     </div>
//   );
// }

// export default App;
//task 1.2

//1.pass score as a string
// TypeScript Error:
// Type 'string' is not assignable to type 'number'.
// This helps catch incorrect data types during development instead of causing
// unexpected behavior when the application is running.

//2.pass ispresent as a string
// TypeScript Error:
// Type 'string' is not assignable to type 'boolean'.
// TypeScript ensures only true or false values are passed, preventing logic
// errors that could occur at runtime.

//3.remove the isPresent prop
// TypeScript Error:
// Property 'isPresent' is missing but required in type 'InternCardProps'.
// TypeScript ensures all required props are provided before the code runs,
// avoiding missing data errors at runtime.

//4.add extra prop
// TypeScript Error:
// Property 'age' does not exist on type 'InternCardProps'.
// TypeScript prevents passing unsupported props, helping catch typos
// and keeping the component interface consistent.
/*2.1
import "./App.css";
import InternCard from "./InternCard";
import ProfileCard from "./ProfileCard";

function App() {
  return (
    <div>
      <h1>Intern Cards</h1>

      <InternCard name="Rahul" score={92} isPresent={true} />
      <InternCard name="Priya" score={78} isPresent={true} />
      <InternCard name="Amit" score={45} isPresent={false} />

      <h1>Profile Cards</h1>

      <ProfileCard
        name="Rahul"
        role="Frontend"
        score={92}
        skills={["React", "TypeScript", "HTML"]}
      />

      <ProfileCard name="Priya" skills={["Java", "SQL"]} />

      <ProfileCard />
    </div>
  );
}*/

// The '?' symbol marks a property as optional. This means the parent
// component can omit that prop when using the component. If an optional
// prop is not provided, the default value specified in the function
// parameters is used, allowing the component to render without errors.
// */

/*task 3.1*/
import "./App.css";
import InternCard from "./InternCard";
import ProfileCard from "./ProfileCard";
import InternProfile from "./InternProfile";
import Card from "./Card";
import Dashboard from "./Dashboard";
import SelfLearning from "./SelfLearning";
interface Intern {
  id: number;
  name: string;
  score: number;
  isPresent: boolean;
  skills: string[];
}

function App() {
  const rahul: Intern = {
    id: 1,
    name: "Rahul",
    score: 92,
    isPresent: true,
    skills: ["HTML", "CSS", "TypeScript", "React"],
  };
  const priya: Intern = {
    id: 2,
    name: "Priya",
    score: 78,
    isPresent: true,
    skills: ["Node.js", "TypeScript"],
  };

  return (
    <div>
      <h1>Intern Cards</h1>

      <InternCard name="Rahul" score={92} isPresent={true} role="Frontend" />

      <InternCard name="Priya" score={78} isPresent={true} role="Backend" />

      <InternCard name="Amit" score={45} isPresent={false} role="Intern" />

      <h1>Profile Cards</h1>

      <ProfileCard
        name="Rahul"
        role="Frontend"
        score={92}
        skills={["React", "TypeScript", "HTML"]}
      />

      <ProfileCard name="Priya" skills={["Java", "SQL"]} />

      <ProfileCard />

      <h1>Intern Profile</h1>

      <InternProfile intern={rahul} />
      <InternProfile intern={priya} />

      <InternProfile intern={{ ...priya }} />
      <h1>Children Prop Demo</h1>

      <Card title="Rahul">
        <p>Score: 92</p>
        <p>Status: Present</p>
        <button>View Profile</button>
      </Card>

      <Card title="Announcements">
        <ul>
          <li>Session 3 tomorrow at 10am</li>
          <li>Submit PRs by EOD</li>
        </ul>
      </Card>
      <Card title="Empty Card" />
      <h1>Dashboard</h1>
      <Dashboard />

      <h1>Self Learning</h1>
      <SelfLearning />
    </div>
  );
}

export default App;
