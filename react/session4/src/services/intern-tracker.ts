/*
Task 2 — Refactor a Class

Reflection:
- All internal state is hidden using the # private field syntax.
- The public interface exposes only loadAll(), getAll(), and getById().
- Internal helper methods (#buildUrl and #updateCache) are private because
  callers should never invoke them directly.
- API_KEY and DEFAULT_LIMIT are not exported since they are implementation
  details of the module.
- Returning readonly Intern[] prevents callers from modifying the intern list
  using methods such as push() or splice(), preserving encapsulation.

Encapsulation Check:
✔ tracker.interns            // TypeScript error
✔ tracker.apiUrl = "/fake"   // TypeScript error

This confirms that callers can only interact with the tracker through its
public methods rather than modifying its internal state directly.
*/

interface Intern {
  id: number;
  name: string;
  score: number;
  role: string;
  isPresent: boolean;
}

class InternTracker {
  // Private fields
  #interns: Intern[] = [];
  #apiUrl = "/api/interns";
  #lastFetchedAt: Date = new Date(0);
  #localCache = new Map<number, Intern>();

  async loadAll(): Promise<void> {
    const response = await fetch(this.#apiUrl);

    this.#interns = await response.json();

    this.#lastFetchedAt = new Date();

    this.#localCache.clear();

    for (const intern of this.#interns) {
      this.#updateCache(intern);
    }
  }

  getAll(): readonly Intern[] {
    return this.#interns;
  }

  getById(id: number): Intern | undefined {
    return this.#localCache.get(id);
  }
  // Updates an intern's score after validation.
  updateScore(internId: number, score: number): void {
    // Validate score
    if (score < 0 || score > 100) {
      throw new RangeError("Score must be between 0 and 100");
    }

    // Find the intern
    const intern = this.#localCache.get(internId);

    if (!intern) {
      throw new Error("Intern not found");
    }

    // Update the score
    intern.score = score;

    // Keep the cache in sync
    this.#updateCache(intern);
  }
  // Private helper methods

  #buildUrl(id: number): string {
    return `${this.#apiUrl}/${id}`;
  }

  #updateCache(intern: Intern): void {
    this.#localCache.set(intern.id, intern);
  }
}

export type { Intern };
export { InternTracker };
/*
Reflection:

The updateScore() method validates all input before modifying the internal
state. Callers cannot directly modify the #interns array because it is private.
Instead, they interact only through the public methods updateScore(), getById(),
and getAll().

The tests verify behavior using only the public API. They never access
private fields directly, which keeps the tests independent of the class's
internal implementation and preserves encapsulation.
*/