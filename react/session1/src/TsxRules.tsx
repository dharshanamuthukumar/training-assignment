function TsxRules() {
  return (
    <div>
      {/* Input elements must be self-closing in TSX */}
      <input type="text" />

      {/* TSX uses className instead of class because class is a JavaScript keyword */}
      <p className="highlight">Styled paragraph</p>

      {/* TSX uses htmlFor instead of for because for is a JavaScript keyword */}
      <label htmlFor="email">Email</label>

      {/* Self-close the input tag */}
      <input id="email" type="email" />

      {/* The style prop takes a JavaScript object, not a CSS string */}
      <p style={{ color: "red", fontSize: "16px" }}>Red text</p>

      {/* Comments in TSX must be written inside curly braces */}
      {/* This is a comment */}
    </div>
  );
}

export default TsxRules;
