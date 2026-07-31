interface InternRowProps {
  id: number;
  name: string;
  score: number;
  onRemove: (id: number) => void;
}

function InternRow({ id, name, score, onRemove }: InternRowProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        marginBottom: "8px",
      }}
    >
      <div>
        <h3>{name}</h3>
        <p>Score: {score}</p>
      </div>

      <button onClick={() => onRemove(id)}>Remove</button>
    </div>
  );
}

export default InternRow;
