interface BadgeProps {
  label: string;
  color: string;
}

function Badge({ label, color }: BadgeProps) {
  // This component has a single responsibility: displaying a colored badge
  // with the given label.

  return (
    <span
      style={{
        background: color,
        color: "white",
        padding: "2px 10px",
        borderRadius: "4px",
        fontSize: "12px",
      }}
    >
      {label}
    </span>
  );
}

export default Badge;
