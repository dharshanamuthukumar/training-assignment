<!-- // Dependency Diagram:
//
// AddInternForm.tsx
//   └─ calls useInternForm (coordination hook)
//       └─ calls validateInternForm (service)
//       └─ calls addIntern (injected from context)
//           └─ calls createIntern (service)
//           └─ calls repo.add (repository)
//
//
// SummaryBarContainer.tsx
//   └─ gets interns from context
//       └─ calls calculateAverageScore (service)
//           └─ passes averageScore to SummaryBar
//
// SummaryBar.tsx
//   └─ receives display data through props
//       └─ renders UI only
//
//
// InternProvider (intern-context.tsx)
//   ├─ calls useInternRepository (repository)
//   │   └─ manages intern state
//   │
//   └─ calls intern-service
//       ├─ createIntern()
//       ├─ calculateAverageScore()
//       └─ filterInterns()
//
//
// useInternRepository (repository)
//   └─ manages React state
//       └─ interns[]
//
//
// Dependency direction:
//
// UI Components
//       ↓
// Coordination Hooks
//       ↓
// Context (wiring)
//       ↓
// Service + Repository
//       ↓
// State
//
//
// No arrows point upward from lower layers to higher layers.
// There are no circular dependencies. -->