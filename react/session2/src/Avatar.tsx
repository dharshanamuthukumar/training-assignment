interface AvatarProps {
  name: string;
}

function Avatar({ name }: AvatarProps) {
  // This component has a single responsibility: displaying a user's avatar
  // based on the provided name.

  return (
    <img
      src={`https://i.pravatar.cc/50?u=${name}`}
      alt={name}
      style={{ borderRadius: "50%", width: 50, height: 50 }}
    />
  );
}

export default Avatar;
