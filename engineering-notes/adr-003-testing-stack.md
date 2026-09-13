# ADR-003: Testing Stack

## Status

Accepted

## Context

Pulse needs meaningful automated testing across domain behavior, APIs, accessible UI, and critical user journeys.

The target role values testing, accessibility, engineering quality, and maintainability.

The project should therefore demonstrate multiple test levels without creating a test suite that is unnecessarily large.

## Decision

Pulse will use the following testing layers:

### Vitest

Used for:

- unit tests;
- domain tests;
- application/use-case tests;
- fast deterministic logic.

### React Testing Library

Used for:

- component behavior;
- user-facing interaction;
- rendered state validation.

The tests should prefer accessible queries and observable behavior over implementation details.

### axe-based accessibility testing

Used for automated accessibility checks on important rendered experiences.

### Playwright

Used for a small number of high-value end-to-end journeys.

The initial E2E coverage will focus on:

- project overview;
- audit inspection;
- finding inspection;
- audit comparison.

## Test Pyramid

The intended distribution is:

```text
             E2E
          /-------\
       Integration
      /-------------\
        Unit / Domain
```

Most business logic should be covered by fast unit tests.

Integration tests verify important boundaries.

E2E tests remain limited to critical journeys.

Accessibility checks complement these layers.

## Alternatives Considered

### Jest instead of Vitest

Jest is a mature and valid option.

Vitest was selected because:

- it provides a fast modern test runner;
- it integrates well with a TypeScript/Vite-oriented testing ecosystem;
- the API is familiar to frontend engineers;
- it keeps the test tooling lightweight for the project.

This decision is not based on Jest being unsuitable.

### Cypress instead of Playwright

Cypress is also a valid E2E solution.

Playwright was selected because it provides:

- strong browser automation;
- multi-browser coverage;
- useful support for cross-browser testing;
- a straightforward fit for the project's E2E requirements.

### E2E-only testing

Rejected because:

- feedback is slower;
- domain behavior is harder to isolate;
- failures are less precise;
- important business rules should be tested without a browser.

### Unit tests only

Rejected because unit tests do not adequately validate:

- API boundaries;
- accessibility behavior;
- integrated UI flows;
- real browser interactions.

## Consequences

### Positive

- Fast feedback for domain rules.
- Meaningful component and integration coverage.
- Automated accessibility validation.
- Cross-browser E2E capability.
- Clear relationship between acceptance criteria and tests.

### Negative

- Multiple testing tools increase setup and maintenance.
- Playwright tests require browser installation and can take longer in CI.
- Accessibility automation cannot prove complete WCAG conformance.

## Testing Principles

Tests must:

- verify behavior rather than implementation details;
- remain deterministic;
- use realistic fixtures;
- fail for meaningful regressions;
- accompany behavior changes.

The project must not:

- disable tests to bypass failures;
- add arbitrary waits to hide race conditions;
- weaken assertions solely to make CI pass.

## CI Integration

The CI pipeline should include:

```text
typecheck
lint
unit/integration tests
accessibility tests
build
E2E tests
```

The exact ordering can later be optimized for feedback speed.
