function ScoreCard() {
  const name: string = "Priya";
  const score: number = 78;

  return (
    <div>
      <h2>{name}</h2>

      {/* Use a ternary when you need to choose between two values or UI elements
          inside TSX. An if statement is used outside the JSX because it is a statement,
          not an expression. */}
      <p>{score >= 50 ? "Pass" : "Fail"}</p>

      <p style={{ color: score >= 50 ? "green" : "red" }}>Score: {score}</p>

      {score >= 90 ? <span>Top Performer</span> : <span>Keep it up!</span>}
    </div>
  );
}

export default ScoreCard;
