function Dashboard() {
  const interns = [
    { id: 1, name: "Rahul", score: 92, isPresent: true },
    { id: 2, name: "Priya", score: 78, isPresent: true },
    { id: 3, name: "Amit", score: 45, isPresent: false },
    { id: 4, name: "Sneha", score: 95, isPresent: true },
  ];

  const presentCount = interns.filter((intern) => intern.isPresent).length;

  return (
    <div>
      <h2>Intern Dashboard</h2>

      {interns.map((intern) => (
        <div key={intern.id} className="intern-card">
          <h3>{intern.name}</h3>

          <p
            style={{
              color: intern.score >= 50 ? "green" : "red",
            }}
          >
            Score: {intern.score} — {intern.score >= 50 ? "Pass" : "Fail"}
          </p>

          {intern.score >= 90 && (
            <span style={{ fontWeight: "bold" }}>🏆 Top Performer</span>
          )}

          <p>{intern.isPresent ? "Present today" : "Absent today"}</p>

          <hr />
        </div>
      ))}

      <p>
        Showing {interns.length} interns — {presentCount} present
      </p>
    </div>
  );
}

export default Dashboard;
