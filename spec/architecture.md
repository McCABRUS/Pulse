# Pulse — Architecture Specification

## 1. Architecture Goals

Pulse should demonstrate a maintainable frontend architecture for a small Next.js application.

The architecture must:

- keep presentation concerns separate from domain rules;
- keep transport concerns separate from domain models;
- support REST and GraphQL with explicit responsibilities;
- make core business rules independently testable;
- allow deterministic data sources for the MVP;
- make external audit integrations possible without coupling them to the UI;
- preserve a clear boundary between server and client code;
- avoid unnecessary abstraction or infrastructure.

The architecture must remain proportional to the size of the product.

---

## 2. System Context

Pulse is a frontend-oriented web application that presents technical quality information for web projects.

The MVP uses deterministic audit data.

Conceptually:

```text
User
  |
  v
Next.js Application
  |
  +--------------------+
  |                    |
  v                    v
REST API           GraphQL API
  |                    |
  +---------+----------+
            |
            v
      Application Layer
            |
            v
        Domain Layer
            |
            v
     Repository / Data
```

External audit providers are not required for the MVP.

Future providers may be introduced through adapters.

---

## 3. Application Architecture

The application is organized into four logical layers.

### Presentation

Responsible for:

- routes;
- pages;
- layouts;
- UI components;
- user interaction;
- accessibility behavior;
- view-specific data composition.

Presentation code must not contain core scoring or comparison rules.

### Application

Responsible for orchestrating use cases.

Examples:

- retrieving a project overview;
- retrieving an audit;
- comparing audits;
- retrieving findings.

Application services coordinate domain behavior and infrastructure dependencies.

The application layer should consume domain models and stable ports/interfaces, not provider-specific DTOs or infrastructure-specific schema libraries.

### Domain

Responsible for business concepts and rules.

Examples:

- Project;
- Audit;
- Finding;
- Metric;
- score calculation;
- metric comparison;
- severity classification.

The domain layer must not depend on React, Next.js, HTTP, GraphQL, Zod, or database-specific APIs.

### Infrastructure

Responsible for external concerns.

Examples:

- REST handlers;
- GraphQL resolvers;
- repositories;
- deterministic data source;
- external audit adapters;
- runtime schema validation.

Provider-specific validation and mapping belong here.

---

## 4. Frontend Architecture

Pulse uses the Next.js App Router.

The application should prefer Server Components for read-only UI and data composition where practical.

Client Components should be introduced when interaction requires client-side behavior.

The client boundary should remain as small as practical.

---

## 5. Suggested Project Structure

The final implementation may evolve, but the intended organization is:

```text
src/
├── app/
├── components/
├── domain/
│   ├── entities/
│   ├── value-objects/
│   └── services/
├── application/
│   ├── use-cases/
│   ├── queries/
│   └── ports/
├── infrastructure/
│   ├── api/
│   ├── graphql/
│   ├── repositories/
│   ├── adapters/
│   ├── data/
│   └── validation/
└── ...
```

The structure should follow responsibility boundaries rather than create folders for every possible abstraction.

---

## 6. Domain Model

The initial domain consists of:

### Project

Represents a monitored web experience.

### Audit

Represents a point-in-time assessment.

### Metric

Represents a measurable technical signal.

### Finding

Represents a technical issue identified by an audit.

### Recommendation

Represents an actionable remediation associated with a finding.

The domain model should remain independent of API transport and provider-specific payload formats.

---

## 7. REST API

REST is used for resource-oriented access and commands.

Initial responsibilities:

```text
GET  /api/projects
GET  /api/projects/:id
GET  /api/audits/:id
POST /api/audits
POST /api/audits/:id/compare
```

REST handlers must:

1. receive transport data;
2. validate input;
3. call an application use case;
4. map domain results to transport responses;
5. return appropriate HTTP status codes.

Business rules must not be implemented directly inside route handlers.

---

## 8. GraphQL API

GraphQL is used for flexible read composition.

GraphQL should expose domain-oriented types rather than provider-specific or persistence-specific structures.

GraphQL resolvers should delegate to application services rather than contain business logic.

---

## 9. REST and GraphQL Boundary

REST is preferred for:

- resource retrieval;
- resource-oriented operations;
- commands;
- predictable HTTP semantics.

GraphQL is preferred for:

- composite read views;
- related data across multiple entities;
- client-selected response shape.

The same business rule must not be implemented independently in REST and GraphQL.

Both transports should call the same application/domain behavior.

---

## 10. Validation and External Ingestion

Data crossing an external boundary must be validated at runtime.

The intended external ingestion flow is:

```text
External provider payload
      |
      v
Infrastructure validation
      |
      v
Validated provider DTO
      |
      v
Infrastructure Adapter
      |
      v
Pulse domain model
      |
      v
Application layer
```

The validation library is an infrastructure concern.

For the current MVP, Zod is used to validate provider-shaped audit records.

The application and domain layers must not import Zod schemas directly.

TypeScript types alone are not sufficient protection for untrusted runtime data.

---

## 11. Error Handling

The application must distinguish:

- invalid input;
- unavailable resource;
- domain rule violation;
- unexpected infrastructure failure.

Transport layers should map these failures to appropriate HTTP or GraphQL error representations.

External ingestion should reject malformed provider payloads before attempting domain mapping.

---

## 12. Design Patterns

Only three patterns are currently approved for the MVP.

### Strategy

Used when different scoring rules need a common interface.

### Adapter

Used to translate external audit-provider representations into Pulse domain models.

The adapter boundary is infrastructure-only.

The adapter should receive a validated provider DTO and produce a domain entity.

It should not:

- perform HTTP;
- own runtime schema validation;
- call UI code;
- contain business scoring rules.

### Repository

Used to isolate data persistence and retrieval from application/domain logic.

Any additional pattern requires explicit justification.

---

## 13. Data Source and Adapter Boundaries

An external audit source may use a provider-specific structure such as:

```text
ExternalAuditRecord
- audit_id
- project_id
- created_at
- score.overall
- score.performance
- score.accessibility
- score.api
```

Pulse requires:

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

The mapping belongs in infrastructure.

The application layer consumes only the Pulse domain model.

This makes a future provider replaceable without changing product behavior.

### Ingestion boundary

The ingestion boundary owns the composition:

```text
unknown
  |
  v
provider schema validation
  |
  v
validated provider DTO
  |
  v
adapter.toDomain()
  |
  v
Audit
```

This composition belongs in infrastructure because it combines provider-specific validation and provider-specific mapping.

The application layer should receive an already validated domain object or a stable port result, not raw external input.

---

## 14. Testing Architecture

Testing is organized by responsibility.

```text
Unit
  |
  +-- Domain rules
  +-- Scoring
  +-- Comparison
  +-- Validation transformations
  +-- Adapter mapping
  +-- Ingestion boundary

Integration
  |
  +-- REST handlers
  +-- GraphQL resolvers
  +-- Application services
  +-- Repositories
  +-- Adapter boundaries

Component / Accessibility
  |
  +-- Interactive UI
  +-- Dialogs
  +-- Forms
  +-- Keyboard behavior
  +-- axe checks

E2E
  |
  +-- Critical user journeys
```

Tests should verify behavior rather than implementation details.

---

## 15. Accessibility Architecture

Accessibility is a cross-cutting product requirement.

The architecture must support:

- semantic HTML;
- keyboard interaction;
- focus management;
- accessible naming;
- accessible descriptions;
- dialog semantics;
- live-region behavior;
- reduced-motion handling.

---

## 16. Performance Strategy

Performance should be considered at architecture level.

Initial principles:

- prefer Server Components for non-interactive content;
- minimize client-side JavaScript;
- keep client boundaries small;
- avoid unnecessary dependencies;
- measure before and after meaningful optimizations.

---

## 17. Data Flow

For external audit ingestion:

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
Domain model
      |
      v
Application use case
      |
      v
Presentation / API
```

For normal application reads:

```text
User
  |
  v
Next.js route
  |
  v
Application use case
  |
  v
Repository / Adapter
  |
  v
Domain model
  |
  v
UI or API response
```

---

## 18. Deployment

The initial deployment target should be a managed Next.js-compatible platform.

The project should produce reproducible builds and automated checks through GitHub Actions.

Docker is not a requirement for the MVP.

---

## 19. Security Considerations

The MVP should consider:

- validation of external input;
- safe error handling;
- avoiding secret exposure;
- safe rendering of evidence and descriptions;
- dependency hygiene.

Any future external URL fetching or remote audit execution must be reviewed separately for SSRF and related risks.

---

## 20. Architectural Trade-offs

### Deterministic data instead of live audit execution

Chosen because it keeps the MVP small and reproducible.

### Separate domain layer

Chosen to make business rules testable and framework-independent.

### REST plus GraphQL

Chosen because both solve different API problems and are relevant to the target role.

### Adapter boundary for external audit data

Chosen because external providers have their own contracts and Pulse needs a stable domain model.

Trade-off:

Adds a translation layer, but isolates provider-specific change and makes external integration testable.

### Validation + adapter as infrastructure

Chosen to keep provider-specific schema libraries and payload formats out of the application and domain layers.

Trade-off:

Adds an ingestion boundary, but preserves clean domain/application dependencies.

### No database initially

Chosen to keep the MVP focused on frontend and application architecture.
