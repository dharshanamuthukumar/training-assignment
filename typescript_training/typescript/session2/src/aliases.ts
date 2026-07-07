type UserId = string;
type ProductId = string;
type Timestamp = number;
type Status = "active" | "inactive" | "pending";
type Direction = "north" | "south" | "east" | "west";
function getUserById(id: UserId): void {
  console.log("Fetching user with ID:", id);
}

function updateStatus(id: UserId, status: Status): void {
  console.log(`Updating user ${id} to ${status}`);
}

function move(direction: Direction, steps: number): void {
  console.log(`Moving ${steps} steps towards ${direction}`);
}

const userId: UserId = "U101";
const productId: ProductId = "P202";
const currentTime: Timestamp = Date.now();

getUserById(userId);
updateStatus(userId, "active");
move("north", 5);

getUserById("U999");

/*
Observation:
TypeScript does not give an error because UserId is simply an alias
for the string type. A normal string is accepted wherever UserId is expected.
*/

/*
Structural Typing vs Nominal Typing
TypeScript uses structural typing, which means types are compatible
based on their structure, not their names.

For example:
type UserId = string;
type ProductId = string;
Both are just strings, so TypeScript considers them interchangeable.

Example:
const uid: UserId = "U101";
const pid: ProductId = uid;   
This is a limitation because TypeScript cannot distinguish between
different string aliases even though they represent different concepts.
*/
