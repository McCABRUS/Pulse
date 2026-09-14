# Feature Specification — Audit Comparison

## 1. Feature Summary

The Audit Comparison view allows a frontend engineer to compare two audits for the same project and understand how technical quality changed between them.

The comparison focuses on:

- overall health;
- performance;
- accessibility;
- API health.

The result communicates whether each dimension improved, regressed, or remained unchanged.

---

## 2. User Story

As a frontend engineer,
I want to compare two audits,
so that I can understand how the technical quality of a project changed over time.

---

## 3. Goals

The feature should allow the user to:

- compare two audits belonging to the same project;
- see the score for each audit;
- see the delta between the scores;
- identify improvements;
- identify regressions;
- identify unchanged dimensions.

---

## 4. Non-Goals

This feature does not include:

- editing audits;
- rerunning audits;
- automatic remediation;
- comments;
- real-time monitoring;
- comparison across different projects.

---

## 5. Domain Rules

### ACMP-DR-001 — Higher scores are better

For all health dimensions:

- a higher score is an improvement;
- a lower score is a regression;
- an equal score is unchanged.

### ACMP-DR-002 — Delta

The delta is calculated as:

```text
current score - previous score
```

### ACMP-DR-003 — Same project

Two audits can only be compared when they belong to the same project.

---

## 6. Acceptance Criteria

### ACMP-001 — Overall score comparison

Given two audits for the same project,
when they are compared,
then the result contains the previous score, current score, delta, and status for overall health.

### ACMP-002 — Dimension comparison

Given two audits for the same project,
when they are compared,
then performance, accessibility, and API health each contain a previous score, current score, delta, and status.

### ACMP-003 — Improvement

When a current score is greater than the previous score,
then the status is `improved`.

### ACMP-004 — Regression

When a current score is lower than the previous score,
then the status is `regressed`.

### ACMP-005 — Unchanged

When a current score equals the previous score,
then the status is `unchanged`.

### ACMP-006 — Different projects

When two audits belong to different projects,
then the comparison is rejected.

---

## 7. Testing Requirements

The comparison logic requires:

- domain unit tests for status calculation;
- domain unit tests for delta calculation;
- domain tests for same-project validation;
- application tests for audit retrieval;
- component tests for comparison presentation;
- E2E coverage for the primary comparison journey.

---

## 8. Accessibility Requirements

Comparison results must:

- use semantic table or equivalent structured markup where appropriate;
- expose the status in text, not only through color;
- provide meaningful headings;
- remain understandable when color is unavailable;
- preserve keyboard navigation.

---

## 9. Performance Requirements

The comparison view should:

- reuse existing audit data where possible;
- avoid duplicate network requests;
- keep comparison calculations in the domain layer;
- avoid unnecessary client-side computation.

---

## 10. Definition of Done

The feature is complete when:

1. all comparison acceptance criteria are satisfied;
2. comparison domain logic is unit tested;
3. invalid cross-project comparisons are rejected;
4. the comparison UI is accessible;
5. the primary comparison journey has E2E coverage;
6. typecheck, lint, build, and tests pass.
