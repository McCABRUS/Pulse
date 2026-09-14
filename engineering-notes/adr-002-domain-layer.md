# ADR-002: Separate Domain Layer

## Status

Accepted

## Context

Pulse contains business rules that should remain independent from React, Next.js, REST, and GraphQL.

Pulse may also ingest data from external audit providers.

External providers are expected to expose provider-specific payloads that may differ from the Pulse domain model.

For example, an external source may use:

```text
audit_id
project_id
created_at
score.overall
score.performance
score.accessibility
score.api
```

while Pulse requires:

```text
Audit
- id
- projectId
- createdAt
- overallScore
- performance
- accessibility
- apiHealth
- findings
```

Allowing provider-specific payloads to reach the domain would couple the application to external contracts.

## Decision

Pulse will use a separate domain layer.

The domain layer contains business concepts and rules such as:

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
- database-specific APIs;
- provider-specific API DTOs;
- Zod or other infrastructure validation libraries.

Provider-specific audit data will be translated through an Adapter in the infrastructure layer before it reaches the domain.

The intended flow is:

```text
External provider
      |
      v
Provider validation
      |
      v
Provider DTO
      |
      v
Adapter
      |
      v
Pulse domain model
      |
      v
Application
      |
      v
Presentation / API
```

The combination of runtime validation and provider-specific mapping belongs to infrastructure. The application layer must not receive raw external payloads.

## Design Patterns

### Strategy

Used when multiple scoring algorithms share a common conceptual contract.

### Adapter

Used to translate external audit-provider representations into Pulse domain models.

The adapter belongs in infrastructure and should receive a validated provider DTO.

Validation and HTTP access must remain outside the adapter itself.

### Repository

Used to abstract retrieval and persistence from domain/application logic.

## Alternatives Considered

### Put business logic in React components

Rejected because rules become coupled to presentation and harder to test.

### Put business logic in API handlers/resolvers

Rejected because REST and GraphQL could duplicate behavior and domain behavior becomes transport-dependent.

### Allow provider payloads directly into the domain

Rejected because provider-specific contract changes would propagate through application and UI code.

### Make the adapter responsible for validation

Rejected because validation and mapping are separate responsibilities. Keeping them separate makes each easier to test and avoids hiding malformed-input handling inside domain translation.

### Let the application layer depend directly on Zod

Rejected because Zod is an infrastructure implementation detail of external-input validation. The application layer should depend on validated domain-level inputs and stable ports instead.

### Full enterprise-style layered architecture

Rejected because it would add unnecessary ceremony for the size of Pulse.

## Consequences

### Positive

- Core business rules remain independently testable.
- REST and GraphQL can share behavior.
- Future data providers can be introduced through adapters.
- Provider-specific contracts remain isolated in infrastructure.
- External payload changes can be handled at the adapter boundary.
- The domain and application layers remain independent of the chosen validation library.

### Negative

- Adds mapping code between external DTOs and domain models.
- Adds an infrastructure ingestion boundary.
- Developers must maintain explicit boundaries.

## Guardrail

The domain layer must remain proportional to the product.

A new abstraction should be introduced only when it provides a clear separation of responsibility, improves testability, or represents a real domain concept.

The adapter must not become a generic transformation framework. Each adapter should address a concrete external contract.
