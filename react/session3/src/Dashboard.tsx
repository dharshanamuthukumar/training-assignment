import { useState, useEffect, useRef } from "react";

interface Intern {
  id: number;
  name: string;
  score: number;
  role: string;
  isPresent: boolean;
}

function Dashboard() {
  const [interns, setInterns] = useState<Intern[]>([]);
  const [search, setSearch] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Load intern data after the component mounts
  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setInterns([
        {
          id: 1,
          name: "Rahul",
          score: 92,
          role: "Frontend",
          isPresent: true,
        },
        {
          id: 2,
          name: "Priya",
          score: 78,
          role: "Backend",
          isPresent: true,
        },
        {
          id: 3,
          name: "Amit",
          score: 45,
          role: "Frontend",
          isPresent: false,
        },
        {
          id: 4,
          name: "Sneha",
          score: 95,
          role: "Fullstack",
          isPresent: true,
        },
      ]);

      setIsLoading(false);
    }, 1500);
  }, []);

  // Focus the search input whenever the panel opens
  useEffect(() => {
    if (isPanelOpen) {
      searchInputRef.current?.focus();
    }
  }, [isPanelOpen]);

  // Filtered list is derived from state (not stored separately)
  const filteredInterns = interns.filter((intern) =>
    intern.name.toLowerCase().includes(search.toLowerCase()),
  );

  if (isLoading) {
    return <p>Loading interns...</p>;
  }

  return (
    <div>
      <h2>Intern Dashboard</h2>

      <button onClick={() => setIsPanelOpen((prev) => !prev)}>
        {isPanelOpen ? "Hide Search" : "Show Search"}
      </button>

      {isPanelOpen && (
        <div style={{ marginTop: "10px", marginBottom: "10px" }}>
          <input
            ref={searchInputRef}
            type="text"
            value={search}
            placeholder="Search interns..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      )}

      <p>
        Showing {filteredInterns.length} of {interns.length} interns
      </p>

      {filteredInterns.map((intern) => (
        <div
          key={intern.id}
          style={{
            border: "1px solid gray",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <p>
            <strong>Name:</strong> {intern.name}
          </p>
          <p>
            <strong>Role:</strong> {intern.role}
          </p>
          <p>
            <strong>Score:</strong> {intern.score}
          </p>

          <span
            style={{
              color: intern.score >= 50 ? "green" : "red",
              fontWeight: "bold",
            }}
          >
            {intern.score >= 50 ? "Pass" : "Fail"}
          </span>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
