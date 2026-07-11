import React, { ReactNode, ReactElement, PropsWithChildren } from "react";

// ---------------------------------------------------------------------
// 1. React.FC
// React.FC is a generic type for function components.
// Example: const MyComponent: React.FC<MyProps> = ({ message }) => { ... }
//
// React.FC automatically includes an optional children prop.
// Typing the props parameter directly gives more control and only includes
// the props that are explicitly defined. Modern React projects generally
// prefer typing the props parameter directly unless the automatic children
// prop is specifically desired.
// ---------------------------------------------------------------------

interface MyProps {
  message: string;
}

const MyComponent: React.FC<MyProps> = ({ message }) => {
  return <p>{message}</p>;
};

// ---------------------------------------------------------------------
// 2. PropsWithChildren
// PropsWithChildren<T> automatically adds an optional children prop to
// an existing interface. It is equivalent to adding
// children?: ReactNode manually, but is a convenient utility type.
// ---------------------------------------------------------------------

type BoxProps = PropsWithChildren<{
  title: string;
}>;

function Box({ title, children }: BoxProps) {
  return (
    <div style={{ border: "1px solid gray", padding: "10px", margin: "10px" }}>
      <h3>{title}</h3>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------
// 3. key Prop
// The key prop is used internally by React to identify elements in a list.
// It helps React efficiently update, add, or remove list items.
// Because key is reserved for React's reconciliation process,
// it is not passed to the component and cannot be accessed as props.key.
// ---------------------------------------------------------------------

// ---------------------------------------------------------------------
// 4. Multiple ReactNode Slots
// Children is used for the main content placed between opening and closing
// component tags. Named ReactNode props such as header and footer are useful
// when a component has multiple content areas with specific purposes.
// ---------------------------------------------------------------------

interface PageLayoutProps {
  header: ReactNode;
  children: ReactNode;
  footer: ReactNode;
}

function PageLayout({ header, children, footer }: PageLayoutProps) {
  return (
    <div style={{ border: "2px solid #ccc", marginTop: "20px" }}>
      <header style={{ background: "#f0f0f0", padding: "12px" }}>
        {header}
      </header>

      <main style={{ padding: "16px" }}>{children}</main>

      <footer style={{ background: "#f0f0f0", padding: "12px" }}>
        {footer}
      </footer>
    </div>
  );
}

// ---------------------------------------------------------------------
// 5. ReactNode vs ReactElement vs JSX.Element
//
// ReactNode:
// Used when any renderable value is accepted.
//
// ReactElement:
// Requires an actual JSX element such as <span>★</span>.
// Strings and numbers are not allowed.
//
// JSX.Element:
// Similar to ReactElement.
// It requires a JSX element and does not allow null or undefined.
//
// Summary:
// ReactNode    -> accepts anything React can render.
// ReactElement -> accepts only JSX elements.
// JSX.Element  -> similar to ReactElement and rejects null/undefined.
// ---------------------------------------------------------------------

interface WrapperProps {
  content: ReactNode;
}

function Wrapper({ content }: WrapperProps) {
  return <div>{content}</div>;
}

interface IconButtonProps {
  icon: ReactElement;
  label: string;
}

function IconButton({ icon, label }: IconButtonProps) {
  return (
    <button>
      {icon} {label}
    </button>
  );
}

interface TooltipProps {
  trigger: JSX.Element;
  tip: string;
}

function Tooltip({ trigger, tip }: TooltipProps) {
  return <span title={tip}>{trigger}</span>;
}

function SelfLearning() {
  return (
    <div>
      <h2>Self Learning Examples</h2>

      <MyComponent message="Hello React.FC" />

      <Box title="PropsWithChildren">
        <p>This content is passed as children.</p>
      </Box>

      <PageLayout
        header={<h1>Intern Dashboard</h1>}
        footer={<p>© 2026 Aarvihsolutions</p>}
      >
        <p>Main content goes here as children.</p>
        <p>Any JSX works — text, elements, or other components.</p>
      </PageLayout>

      <Wrapper content={<strong>ReactNode Example</strong>} />

      <Wrapper content="ReactNode also accepts plain text." />

      <IconButton icon={<span>⭐</span>} label="Star" />

      {/* Try this to see the TypeScript error */}
      {/* <IconButton icon="⭐" label="Star" /> */}

      <Tooltip trigger={<button>Hover Me</button>} tip="Tooltip Example" />

      {/* Try this to see the TypeScript error */}
      {/* <Tooltip trigger={null} tip="Invalid" /> */}
    </div>
  );
}

export default SelfLearning;
