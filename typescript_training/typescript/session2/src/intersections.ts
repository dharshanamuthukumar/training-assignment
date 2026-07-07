type Identifiable = {
  readonly id: string;
};

type Timestamped = {
  createdAt: Date;
  updatedAt: Date;
};

type SoftDeletable = {
  deletedAt?: Date;
  isDeleted: boolean;
};
type BaseRecord = Identifiable & Timestamped;

type UserRecord = BaseRecord & {
  name: string;
  email: string;
};

type AuditedUserRecord = UserRecord & SoftDeletable;
function isDeleted(record: SoftDeletable): boolean {
  return record.isDeleted;
}
const baseRecord: BaseRecord = {
  id: "BR001",
  createdAt: new Date(),
  updatedAt: new Date(),
};

const userRecord: UserRecord = {
  id: "U001",
  createdAt: new Date(),
  updatedAt: new Date(),
  name: "Alice",
  email: "alice@example.com",
};

const auditedUser: AuditedUserRecord = {
  id: "U002",
  createdAt: new Date(),
  updatedAt: new Date(),
  name: "Bob",
  email: "bob@example.com",
  isDeleted: true,
  deletedAt: new Date(),
};

console.log(isDeleted(auditedUser));
console.log(isDeleted({ isDeleted: false }));

/*
Explore: Intersecting conflicting property types

type A = { value: string };
type B = { value: number };
type C = A & B;

The type of C['value'] becomes 'never'.

This is because a value cannot be both a string and a number
at the same time.

Example:

const obj: C = {
  value: "hello" // Error
};

const obj2: C = {
  value: 100 // Error
};

No value can satisfy both types, so creating an object of type C
is impossible.
*/
