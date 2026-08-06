/*
Section 5 — Design the Public Interface First

Reflection:

1. Yes. The internal storage can be changed from Set<number> to Map<number, Date>
   without changing the public interface because callers only interact through
   the methods defined in ISessionLogger.

2. If the raw Set were exposed, callers could directly call add(), delete(), or clear(),
   bypassing validation and any future business rules. Keeping the Set private ensures
   all changes go through the class's public methods.
*/

export interface ISessionLogger {
  // Records that an intern attended.
  recordAttendance(internId: number): void;

  // Returns true if the intern attended.
  hasAttended(internId: number): boolean;

  // Returns the total number of attendees.
  getAttendanceCount(): number;

  // Returns all attendee IDs.
  getAttendeeIds(): readonly number[];
}

export class SessionLogger implements ISessionLogger {
  // Private storage
  #attendees: Set<number> = new Set();

  recordAttendance(internId: number): void {
    this.#attendees.add(internId);
  }

  hasAttended(internId: number): boolean {
    return this.#attendees.has(internId);
  }

  getAttendanceCount(): number {
    return this.#attendees.size;
  }

  getAttendeeIds(): readonly number[] {
    return [...this.#attendees];
  }
}
