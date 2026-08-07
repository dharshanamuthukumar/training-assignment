import React from "react";

export function getScoreLabel(score: number): "Pass" | "Fail" {
  return score >= 50 ? "Pass" : "Fail";
}

interface ScoreBadgeProps {
  score: number;
}

export function ScoreBadge({ score }: ScoreBadgeProps) {
  const label = getScoreLabel(score);
  const isPass = label === "Pass";

  return (
    <span
      className={`score-badge ${isPass ? "pass" : "fail"}`}
      style={{
        display: "inline-block",
        padding: "0.25rem 0.5rem",
        borderRadius: "4px",
        fontSize: "0.85rem",
        fontWeight: "bold",
        backgroundColor: isPass ? "#d1fae5" : "#fee2e2",
        color: isPass ? "#065f46" : "#991b1b",
        marginLeft: "0.5rem",
      }}
    >
      {label}
    </span>
  );
}

export default ScoreBadge;
