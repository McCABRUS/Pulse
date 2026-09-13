# ADR-002: Separate Domain Layer

## Status

Accepted

## Context

Pulse contains business rules that should remain independent from React, Next.js, REST, and GraphQL.

Examples include:

- calculating health scores;
- comparing audit metrics;
- determining improvement or regression;
- handling domain-level validation;
- working with findings and their severity.

Putting these rules directly in components or route handlers would make them difficult to test and easier to duplicate.

## Decision

Pulse will use a separate domain layer.

The domain layer will contain business concepts and rules such as:

```text
Project
Audit
Metric
Finding
Recommendation
Score strategies
Comparison rules
```

The domain layer must not depend on:

- React;
- Next.js;
- HTTP;
- GraphQL;
- browser APIs;
- database-specific APIs.

Application services will orchestrate use cases and coordinate infrastructure dependencies.

The intended dependency direction is:

```text
Presentation
     |
     v
Application
     |
     v
Domain

Infrastructure
     |
     +----> Application / Domain contracts
```

Transport and persistence code must not redefine domain rules.

## Design Patterns

The domain/application architecture allows three intentionally selected patterns:

### Strategy

Used when multiple scoring algorithms share a common conceptual contract.

```text
PerformanceScoreStrategy
AccessibilityScoreStrategy
ApiHealthScoreStrategy
```

### Adapter

Used to translate external audit-provider representations into Pulse domain models.

### Repository

Used to abstract retrieval and persistence from the domain/application logic.

## Alternatives Considered

### Put business logic in React components

Advantages:

- fewer files;
- fast initial implementation.

Disadvantages:

- rules become coupled to presentation;
- testing becomes more difficult;
- reuse is reduced.

Rejected.

### Put business logic in API handlers/resolvers

Advantages:

- easy to implement.

Disadvantages:

- REST and GraphQL could duplicate behavior;
- domain behavior becomes transport-dependent;
- difficult to reuse outside API handlers.

Rejected.

### Full enterprise-style layered architecture

Advantages:

- strict separation;
- highly explicit boundaries.

Disadvantages:

- excessive ceremony for the size of Pulse;
- increased cognitive overhead;
- risk of overengineering.

Rejected.

## Consequences

### Positive

- Core business rules are independently testable.
- REST and GraphQL can share behavior.
- Future data providers can be introduced through adapters.
- Presentation remains focused on UI concerns.

### Negative

- The repository has more structure than a minimal Next.js application.
- Developers must maintain clear boundaries.
- Some abstractions may initially appear unnecessary.

## Guardrail

The domain layer must remain proportional to the product.

A new abstraction should be introduced only when it provides a clear separation of responsibility, improves testability, or represents a real domain concept.
