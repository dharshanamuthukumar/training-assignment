interface Profile {
  displayName: string;
  bio?: string;
  website?: string;
  avatarUrl?: string;
}

function renderProfile(profile: Profile): string {
  let result = `Name: ${profile.displayName}\n`;

  result += `Bio: ${profile.bio ? profile.bio : "No bio provided"}\n`;

  if (profile.website) {
    result += `Website: ${profile.website}`;
  }
  console.log(profile.bio?.toUpperCase());
  return result;
}

const profile1: Profile = {
  displayName: "Alice",
  bio: "Software Developer",
  website: "https://alice.com",
  avatarUrl: "https://alice.com/avatar.jpg",
};

const profile2: Profile = {
  displayName: "Bob",
};

console.log(renderProfile(profile1));
console.log(renderProfile(profile2));

/*
If we write:

profile.bio.toUpperCase();

TypeScript gives an error similar to:
'profile.bio' is possibly 'undefined'.

This happens because 'bio' is an optional property.
If it doesn't exist, calling a string method like
toUpperCase() would cause a runtime error.
TypeScript forces us to check that 'bio' exists first.
*/
