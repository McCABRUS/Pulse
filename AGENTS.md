# Pulse — Agent Instructions

## 1. Project Authority

The repository specification is authoritative.

Before implementing a feature:

1. identify the relevant specification;
2. review its acceptance criteria;
3. identify applicable architectural constraints;
4. define or update tests;
5. implement the smallest solution that satisfies the specification;
6. validate the result.

Do not implement behavior that contradicts an existing specification without first updating the specification and documenting the reason.

---

## 2. Required Workflow

For feature work, follow:

```text
Specification
    ↓
Task decomposition
    ↓
Tests
    ↓
Implementation
    ↓
Automated validation
    ↓
Review
```

The exact order may vary for exploratory work, but completed feature work must preserve traceability between requirements, tests, and implementation.

---

## 3. Repository Documentation

Relevant documentation lives under:

```text
spec/
engineering-notes/
prompts/
```

Before changing architecture:

- review `spec/architecture.md`;
- review relevant ADRs;
- document a meaningful architectural change as an ADR.

Before changing API contracts:

- review `spec/api.md`;
- update API documentation;
- update contract tests.

Before changing accessibility behavior:

- review `spec/accessibility.md`;
- update relevant acceptance criteria or feature specification;
- add or update accessibility tests.

---

## 4. Scope Discipline

Pulse is intentionally a small project.

Do not introduce:

- new dependencies;
- new architectural layers;
- new design patterns;
- new infrastructure;
- new product features

unless they solve a documented problem.

Avoid speculative abstractions.

Prefer the smallest implementation that preserves the architectural boundaries.

---

## 5. TypeScript

Use strict TypeScript.

Do not use `any` unless there is a documented and justified reason.

Prefer:

- explicit domain types;
- discriminated unions;
- narrow interfaces;
- typed function boundaries;
- runtime validation at external boundaries.

Do not assume that a TypeScript type validates runtime data.

---

## 6. Domain Boundaries

Business rules belong in the domain/application layers where appropriate.

Do not put core scoring, comparison, or domain validation rules directly into:

- React components;
- route handlers;
- GraphQL resolvers.

REST and GraphQL transports must delegate to shared application/domain behavior.

---

## 7. Accessibility

Accessibility requirements are part of feature completion.

Implement with:

- semantic HTML;
- native controls where possible;
- keyboard support;
- visible focus;
- correct accessible names;
- correct focus management;
- appropriate ARIA only when needed;
- reduced-motion support for non-essential animation.

Do not use color as the only way to communicate meaning.

Run relevant automated accessibility checks for supported UI.

---

## 8. Testing

Behavior changes require tests.

Prefer the lowest appropriate test level:

- unit tests for domain rules;
- integration tests for boundaries;
- component tests for UI behavior;
- E2E tests for critical user journeys.

Do not test implementation details when observable behavior can be tested instead.

Do not:

- disable failing tests to bypass a problem;
- add arbitrary waits to hide timing issues;
- weaken assertions without documenting why.

---

## 9. API and Runtime Validation

Validate data at external boundaries.

Do not pass unvalidated external payloads directly into domain logic.

API handlers and GraphQL resolvers should:

1. validate input;
2. call application behavior;
3. map results/errors to transport responses.

---

## 10. Performance

Do not optimize without evidence unless an architectural rule requires it.

Prefer:

- small client boundaries;
- Server Components for non-interactive content where appropriate;
- minimal client JavaScript;
- deferred loading for expensive features;
- avoiding unnecessary dependencies.

Performance changes should be measurable when practical.

---

## 11. AI-Assisted Development

AI assistance is allowed and expected as part of the engineering workflow.

AI-generated code must be reviewed.

An agent must not:

- invent APIs or services;
- silently alter architecture;
- add dependencies without justification;
- fabricate requirements;
- claim tests passed without running them.

When uncertainty exists, prefer stating the uncertainty over guessing.

---

## 12. Output Expectations for Coding Agents

When proposing changes:

1. identify the specification being implemented;
2. state the intended files to change;
3. keep the implementation focused;
4. include relevant tests;
5. report validation performed;
6. call out assumptions or unresolved issues.

Do not make unrelated cleanup changes unless explicitly requested.

---

## 13. Completion Criteria

A feature is not complete until:

- implementation satisfies the relevant specification;
- tests for the changed behavior exist;
- typecheck passes;
- lint passes;
- relevant accessibility checks pass;
- documentation is updated when behavior or architecture changes.
