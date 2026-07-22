function SelfLearning() {
  return (
    <div>
      <h2>Self Learning Notes</h2>

      {/* React.StrictMode:
          React.StrictMode is a development-only tool that helps identify potential
          problems in a React application. It checks for deprecated APIs, detects
          unexpected side effects, and intentionally renders components twice in
          development to help developers find bugs. It does not affect production builds.
      */}

      {/* Controlled vs Uncontrolled Components:
          A controlled component stores its form data in React state and updates it
          using event handlers like onChange. An uncontrolled component stores its
          data in the DOM and is usually accessed using a ref. Controlled components
          are preferred because React has full control over the form data.
      */}

      {/* Key Prop:
          The key prop gives each list item a unique identity so React can efficiently
          track which items are added, removed, or updated. Using the array index as
          the key is not recommended because if items are inserted, removed, or reordered,
          React may update the wrong elements. It is better to use a unique and stable
          identifier such as an id from the data.
      */}

      {/* Fragments:
          Fragments (<>...</>) let you group multiple elements without adding an
          extra DOM element. The shorthand syntax <>...</> cannot accept props,
          including key. If you need to assign a key to a Fragment (for example,
          when returning multiple elements from a list), use:
          <React.Fragment key={item.id}>...</React.Fragment>
      */}

      <p>Check the comments in this file for the answers.</p>
    </div>
  );
}

export default SelfLearning;
