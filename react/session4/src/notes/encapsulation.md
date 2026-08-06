// Encapsulation Audit — intern-tracker.ts

export class InternTracker {

  //  Violation: Public mutable field.
  // Should be private because callers should not modify the interns list directly.
  // Provide a getter or dedicated methods (getInterns(), addIntern(), etc.) instead.
  interns: Intern[] = [];

  //   Violation: Internal configuration exposed.
  // Should be private because callers should not know or change the API endpoint.
  apiUrl: string = '/api/interns';

  //   Violation: Internal state exposed.
  // Should be private because it is only used to track when data was last fetched.
  lastFetchedAt: Date = new Date(0);

  //   Violation: Internal cache exposed.
  // Should be private because callers should never manipulate the cache directly.
  _localCache: Map<number, Intern> = new Map();

  async loadAll(): Promise<void> {
    const res = await fetch(this.apiUrl);
    this.interns = await res.json();
    this.lastFetchedAt = new Date();
  }

  //   Violation: Internal helper method.
  // Should be private because URL construction is an implementation detail.
  _buildUrl(id: number): string {
    return `${this.apiUrl}/${id}`;
  }

  //   Violation: Internal helper method.
  // Should be private because cache updates should only happen inside the class.
  _updateCache(intern: Intern): void {
    this._localCache.set(intern.id, intern);
  }
}

//   Violation: API_KEY is an internal implementation detail.
// Should not be exported unless other modules genuinely need it.
export const API_KEY = 'intern-tracker-v1';

//  Depends on usage.
// If DEFAULT_LIMIT is used by other modules as a public configuration value,
// exporting it is acceptable.
// If it is only used inside InternTracker, it should not be exported.
export const DEFAULT_LIMIT = 50;