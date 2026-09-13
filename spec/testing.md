# Pulse — Testing Specification

## 1. Testing Strategy

Pulse follows a behavior-oriented testing strategy.

The goal is not maximum test count.

The goal is to provide confidence across:

- domain behavior;
- application use cases;
- API contracts;
- interactive UI;
- accessibility;
- critical user journeys.

The project should prefer fast deterministic tests for most logic and a small number of high-value E2E tests.

---

## 2. Unit Tests

Unit tests should cover logic that can be executed independently of frameworks and network boundaries.

Primary targets:

- health-score calculations;
- score strategies;
- metric comparison;
- improvement/regression detection;
- finding classification;
- validation transformations;
- domain invariants.

Unit tests should be deterministic and fast.

---

## 3. Integration Tests

Integration tests should verify collaboration between application components.

Targets include:

- application use cases;
- repositories;
- REST handlers;
- GraphQL resolvers;
- input validation;
- error mapping.

Integration tests should verify behavior across boundaries without requiring a full browser.

---

## 4. Component Tests

Component tests should cover UI behavior where isolated interaction testing provides value.

Examples:

- metric cards;
- finding lists;
- filters;
- comparison controls;
- dialogs;
- loading states;
- error states.

Tests should focus on what the user can observe and do.

Implementation details should not be the primary assertion target.

---

## 5. Accessibility Tests

Automated accessibility tests must be part of the test suite.

The project should use an automated axe-based solution for relevant rendered UI.

At minimum, test:

- project overview;
- audit detail;
- finding detail/dialog;
- comparison experience;
- important interactive states.

Automated testing does not replace manual accessibility testing.

---

## 6. Manual Accessibility Testing

The project should document manual verification for:

- keyboard-only navigation;
- visible focus;
- focus order;
- dialog focus behavior;
- Escape handling;
- focus restoration;
- screen-reader-relevant semantics where practical;
- reduced-motion behavior.

The manual checklist should be stored in the repository.

---

## 7. End-to-End Tests

Playwright should be used for a small set of critical journeys.

### E2E-001 — Project overview

```text
Open Pulse
→ select project
→ verify project health
```

### E2E-002 — Audit detail

```text
Open project
→ open latest audit
→ inspect audit metrics
```

### E2E-003 — Finding inspection

```text
Open audit
→ select finding
→ verify finding details
```

### E2E-004 — Audit comparison

```text
Open project
→ open comparison
→ select two audits
→ verify comparison result
```

The E2E suite should remain small.

---

## 8. API Contract Tests

REST and GraphQL contracts must be tested.

REST contract tests should verify:

- request validation;
- response shape;
- status codes;
- error shape.

GraphQL tests should verify:

- schema availability;
- representative queries;
- field resolution;
- error behavior.

Contract changes must trigger corresponding test changes.

---

## 9. Acceptance Criteria Coverage

Every implemented feature must map to acceptance criteria.

Example:

```text
AC-005 Improvement detection
        ↓
unit test: comparison/improvement.test.ts
        ↓
component behavior test
        ↓
E2E coverage where the behavior is user-critical
```

Not every acceptance criterion requires an E2E test.

The appropriate test level should be selected according to the behavior being verified.

---

## 10. TDD Usage

TDD should be used selectively where the feedback loop is valuable.

Good candidates:

- scoring strategies;
- comparison rules;
- domain validation;
- error handling;
- transformations.

The project does not require every UI change to follow strict red-green-refactor.

The engineering notes should document examples where tests were written before implementation.

---

## 11. Test Data

Audit fixtures should be deterministic.

Fixtures should include cases for:

- healthy project;
- degraded project;
- no findings;
- critical/serious findings;
- improved metrics;
- regressed metrics;
- a project with only one audit;
- invalid external data;
- missing resources.

Fixtures should avoid unnecessary duplication.

---

## 12. Test Naming

Tests should describe behavior.

Prefer:

```text
reports a performance improvement when LCP decreases
```

over:

```text
calls calculateDelta()
```

Tests should remain understandable without reading implementation code.

---

## 13. CI Validation

The CI pipeline should run at minimum:

```text
install
↓
typecheck
↓
lint
↓
unit/integration tests
↓
accessibility checks
↓
build
↓
E2E tests
```

The exact ordering may change to optimize feedback speed.

---

## 14. Test Failure Principles

A failing test must be investigated rather than bypassed.

The project must not:

- disable tests to unblock CI;
- weaken assertions solely to make tests pass;
- add arbitrary waits to mask race conditions;
- ignore accessibility failures without documenting a reason.

---

## 15. Definition of Test Confidence

A feature is considered adequately tested when:

- core business rules have unit coverage;
- relevant integration boundaries are tested;
- critical UI behavior is tested;
- supported interactive surfaces have accessibility coverage;
- critical end-to-end journeys are covered;
- acceptance criteria are represented by appropriate tests.
