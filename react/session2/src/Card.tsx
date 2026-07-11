import { ReactNode } from "react";

interface CardProps {
  title: string;
  children?: ReactNode;
}

function Card({ title, children }: CardProps) {
  // The children prop is optional because of the '?'.
  // A required children prop means the component must always receive content.
  // An optional children prop allows the component to be used with or without
  // content, which is useful for layouts where the body is not always needed.

  return (
    <div className="card">
      <h3 className="card-title">{title}</h3>
      {children && <div className="card-body">{children}</div>}
    </div>
  );
}

export default Card;
//task 4.2
// A required children prop means the component must always receive content
// between its opening and closing tags. An optional children prop allows
// the component to be used even without any content. Required children are
// useful when the component cannot function without content, while optional
// children are useful for flexible components that may or may not display
// additional content.
