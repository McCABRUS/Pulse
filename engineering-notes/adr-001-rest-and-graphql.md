# ADR-001: REST and GraphQL

## Status

Accepted

## Context

Pulse needs an API architecture that demonstrates sound frontend/API integration while keeping the MVP small.

The product has two distinct read and interaction needs:

- resource-oriented access to projects and audits;
- composed read views where the UI needs related information from several domain entities.

The project requirements also explicitly include both REST and GraphQL.

Using both technologies without different responsibilities would create unnecessary complexity.

## Decision

Pulse will use REST and GraphQL with clearly separated responsibilities.

### REST

REST will be used for:

- resource-oriented operations;
- resource retrieval;
- commands;
- operations where HTTP semantics are useful and predictable.

Examples:

```text
GET  /api/projects
GET  /api/projects/:id
GET  /api/audits/:id
POST /api/audits
POST /api/audits/:id/compare
```

### GraphQL

GraphQL will be used for flexible read composition.

The main initial use case is project and audit overview data where the UI needs related information such as:

- project;
- latest audit;
- performance;
- accessibility;
- API health;
- findings.

GraphQL clients can request the exact fields required by a view.

## Alternatives Considered

### REST only

Advantages:

- simpler architecture;
- fewer concepts to maintain;
- familiar HTTP semantics.

Disadvantages:

- composed read views can require multiple requests or custom endpoint shapes;
- provides weaker evidence for GraphQL experience required by the target role.

Rejected because it would not demonstrate the intended GraphQL capability.

### GraphQL only

Advantages:

- flexible read queries;
- a single query interface.

Disadvantages:

- commands and resource-oriented operations become less explicit;
- HTTP semantics are less central;
- introduces unnecessary GraphQL usage where REST is already appropriate.

Rejected because Pulse benefits from both models.

### REST and GraphQL without a shared application/domain layer

Advantages:

- straightforward initial implementation.

Disadvantages:

- business rules could become duplicated;
- behavior could diverge between API implementations;
- testing becomes less coherent.

Rejected.

## Consequences

### Positive

- Each API style has an explicit responsibility.
- The architecture demonstrates API design rather than technology accumulation.
- REST and GraphQL can share application/domain behavior.
- Composite read views are well suited to GraphQL.
- Resource and command operations retain clear HTTP semantics.

### Negative

- Two transport implementations require additional code and tests.
- Developers must understand when to use each API.
- API documentation and contract tests must cover both interfaces.

## Constraints

The presence of GraphQL must not justify creating GraphQL endpoints for every operation.

When the same business capability is exposed through both interfaces, both must delegate to the same application/domain behavior.
