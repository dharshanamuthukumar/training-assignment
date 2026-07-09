function StatusBadge() {
  const isAdmin: boolean = true;
  const hasWarning: boolean = false;
  const isVerified: boolean = true;
  const messages: string[] = ["Assignment submitted", "PR created"];

  return (
    <div>
      {/* && renders the element only when the condition is true */}

      {isAdmin && <span>Admin</span>}

      {hasWarning && (
        <p style={{ color: "orange" }}>Warning: incomplete tasks</p>
      )}

      {isVerified && <span>Verified</span>}

      {messages.length === 0 && <p>No messages yet</p>}

      {/* shouldn't use only messages.length because when it is 0,
          React renders the number 0. Using messages.length > 0
          returns a boolean and prevents 0 from appearing. */}
      {messages.length > 0 && (
        <ul>
          {messages.map((msg: string, i: number) => (
            <li key={i}>{msg}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default StatusBadge;
