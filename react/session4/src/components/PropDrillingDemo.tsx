interface User {
  name: string;
  isAdmin: boolean;
}

// Grandchild — actually uses the user
function UserBadge({ user }: { user: User }) {
  return (
    <div>
      <p>Logged in as: {user.name}</p>
      {user.isAdmin && <span>Admin</span>}
    </div>
  );
}

// Parent — passes user down to InternCard
// Problem: This component doesn't use `user` itself.
// It only forwards the prop, causing prop drilling.
// If the User interface changes, this component may also
// need updates even though it doesn't use the data.
function InternList({ user }: { user: User }) {
  return (
    <div>
      <InternCard user={user} />
      <InternCard user={user} />
    </div>
  );
}

// Middle component — receives user only to pass it down, never uses it
// Problem: This component is forced to accept and pass `user`
// even though it never reads it. As the application grows,
// many such components become dependent on props they don't need.
// If the User interface gains new fields or changes,
// this component may also require updates unnecessarily.
function InternCard({ user }: { user: User }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "8px" }}>
      <p>Intern Card Content</p>
      <UserBadge user={user} />
    </div>
  );
}

// Top level — owns the user
function PropDrillingDemo() {
  const user: User = { name: "Rahul", isAdmin: true };

  return <InternList user={user} />;
}

export default PropDrillingDemo;
