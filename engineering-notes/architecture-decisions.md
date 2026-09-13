# Architecture Decisions

This file indexes the architectural decisions documented for Pulse.

## ADR-001 — REST and GraphQL

File:

`adr-001-rest-and-graphql.md`

Decision:

REST and GraphQL are both used, but for different responsibilities. REST focuses on resource-oriented operations and commands; GraphQL focuses on flexible read composition.

## ADR-002 — Separate Domain Layer

File:

`adr-002-domain-layer.md`

Decision:

Business rules are isolated in a framework-independent domain layer, with application services coordinating use cases and infrastructure handling external concerns.

## ADR-003 — Testing Stack

File:

`adr-003-testing-stack.md`

Decision:

Use Vitest, React Testing Library, axe-based accessibility testing, and Playwright for complementary levels of automated validation.

## Decision Review Rule

Architectural decisions may be revisited when:

- a new product requirement invalidates an existing assumption;
- implementation reveals a significant trade-off not captured here;
- a dependency introduces a constraint that changes the architecture;
- the complexity of an existing decision becomes disproportionate to the product.

When a decision changes, update the relevant ADR and document the reason.
