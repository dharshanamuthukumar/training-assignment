function SkillList() {
  const skills: string[] = [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "React",
  ];

  return (
    <div>
      <h3>Skills Covered</h3>

      <ul>
        {skills.map((skill: string, index: number) => (
          // React uses keys to identify each list item when updating the UI.
          // Without keys, React shows a warning because it cannot efficiently track changes.
          <li key={index}>{skill}</li>
        ))}
      </ul>

      <p>Total: {skills.length} skills</p>
    </div>
  );
}

export default SkillList;
