# Pulse — Architecture Specification

## 1. Architecture Goals

Pulse should demonstrate a maintainable frontend architecture for a small Next.js application.

The architecture must:

- keep presentation concerns separate from domain rules;
- keep transport concerns separate from domain models;
- support REST and GraphQL with explicit responsibilities;
- make core business rules independently testable;
- allow deterministic data sources for the MVP;
- make future external audit integrations possible without coupling them to the UI;
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

The domain layer must not depend on React, Next.js, HTTP, GraphQL, or database-specific APIs.

### Infrastructure

Responsible for external concerns.

Examples:

- REST handlers;
- GraphQL resolvers;
- repositories;
- deterministic data source;
- future external audit adapters;
- runtime schema validation.

---

## 4. Frontend Architecture

Pulse uses the Next.js App Router.

The application should prefer Server Components for read-only UI and data composition where practical.

Client Components should be introduced when interaction requires client-side behavior, such as:

- interactive controls;
- dialogs;
- filtering;
- comparison selection;
- charts or visualizations;
- browser APIs.

The client boundary should remain as small as practical.

Server and client responsibilities must be explicit.

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
│   └── ports/
├── infrastructure/
│   ├── api/
│   ├── graphql/
│   ├── repositories/
│   ├── adapters/
│   └── validation/
└── ...
```

The structure should follow responsibility boundaries rather than create folders for every possible abstraction.

---

## 6. Domain Model

The initial domain consists of:

### Project

Represents a monitored web experience.

Core information:

- id;
- name;
- latest audit;
- audit history.

### Audit

Represents a point-in-time assessment.

Contains:

- id;
- project id;
- timestamp;
- overall score;
- performance result;
- accessibility result;
- API-health result;
- findings.

### Metric

Represents a measurable technical signal.

Examples:

- LCP;
- CLS;
- INP;
- availability;
- latency;
- error rate.

### Finding

Represents a technical issue identified by an audit.

Contains:

- category;
- severity;
- title;
- description;
- evidence;
- recommendation.

### Recommendation

Represents an actionable remediation associated with a finding.

The domain model should remain independent of the API transport format.

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

The exact endpoints may change during implementation if a better REST boundary is identified.

REST handlers are infrastructure concerns.

They must:

1. receive transport data;
2. validate input;
3. call an application use case;
4. map domain results to transport responses;
5. return appropriate HTTP status codes.

Business rules must not be implemented directly inside route handlers.

---

## 8. GraphQL API

GraphQL is used for flexible read composition.

The first target is the project overview and similarly composed read views.

Conceptually:

```graphql
query ProjectOverview($id: ID!) {
  project(id: $id) {
    id
    name
    healthScore
    latestAudit {
      id
      createdAt
      performance {
        score
        lcp
        cls
        inp
      }
      accessibility {
        score
        violations
      }
      apiHealth {
        score
        availability
        latency
        errorRate
      }
    }
  }
}
```

GraphQL should expose domain-oriented types rather than transport-specific persistence structures.

GraphQL resolvers should delegate to application services rather than contain business logic.

---

## 9. REST and GraphQL Boundary

The two API styles exist because they solve different problems.

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

## 10. Validation

Data crossing an external boundary must be validated at runtime.

The intended flow is:

```text
Transport data
      |
      v
Runtime schema validation
      |
      v
Typed DTO
      |
      v
Application use case
      |
      v
Domain model
```

TypeScript types alone are not considered sufficient protection for untrusted runtime data.

The validation library will be selected during stack definition.

---

## 11. Error Handling

The application must distinguish:

- invalid input;
- unavailable resource;
- domain rule violation;
- unexpected infrastructure failure.

Transport layers should map these failures to appropriate HTTP or GraphQL error representations.

The UI must not expose internal implementation details or stack traces.

User-facing error messages should explain what happened and, where useful, what the user can do next.

---

## 12. Design Patterns

Only three patterns are currently approved for the MVP.

### Strategy

Used when different scoring rules need a common interface.

Example:

```text
PerformanceScoreStrategy
AccessibilityScoreStrategy
ApiHealthScoreStrategy
```

### Adapter

Used to translate external audit-provider data into the Pulse domain model.

The MVP may only contain the deterministic source adapter.

A future Lighthouse integration can reuse the same boundary.

### Repository

Used to isolate data persistence and retrieval from application/domain logic.

The MVP can use an in-memory or deterministic repository.

A database-backed implementation can be introduced later without changing domain rules.

Any additional pattern requires explicit justification.

---

## 13. Testing Architecture

Testing is organized by responsibility.

```text
Unit
  |
  +-- Domain rules
  +-- Scoring
  +-- Comparison
  +-- Validation transformations

Integration
  |
  +-- REST handlers
  +-- GraphQL resolvers
  +-- Application services
  +-- Repositories

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

## 14. Accessibility Architecture

Accessibility is treated as a cross-cutting product requirement.

The architecture must support:

- semantic HTML;
- keyboard interaction;
- focus management;
- accessible naming;
- accessible descriptions;
- dialog semantics;
- live-region behavior;
- reduced-motion handling.

Reusable components should establish accessible defaults.

Accessibility violations identified through automated tooling should be treated as defects when they affect supported user journeys.

---

## 15. Performance Strategy

Performance should be considered at architecture level.

Initial principles:

- prefer Server Components for non-interactive content;
- minimize client-side JavaScript;
- keep client boundaries small;
- avoid unnecessary dependencies;
- avoid loading large visualization libraries until needed;
- avoid unnecessary network requests;
- use stable data shapes;
- measure before and after meaningful optimizations.

The application will be evaluated with Lighthouse and Core Web Vitals.

No performance optimization should be added only to improve a synthetic score.

---

## 16. Data Flow

A typical read flow is:

```text
User
  |
  v
Next.js route
  |
  v
Server Component / Client Component
  |
  v
GraphQL or REST boundary
  |
  v
Application use case
  |
  v
Repository / Adapter
  |
  v
Validated data
  |
  v
Domain model
  |
  v
View model / response
  |
  v
UI
```

For domain-driven operations, the domain rules must execute before presentation formatting.

---

## 17. Deployment

The initial deployment target should be a managed Next.js-compatible platform.

The project should produce:

- reproducible builds;
- a production build;
- automated checks through GitHub Actions.

Containerization is not a requirement for the MVP.

Docker should only be added if a concrete architectural or deployment need justifies it.

---

## 18. Security Considerations

The MVP is not an authenticated multi-user system, but the architecture must still consider:

- validation of external input;
- safe error handling;
- avoiding secret exposure to client bundles;
- safe rendering of evidence and descriptions;
- avoiding direct trust of arbitrary API payloads;
- dependency hygiene.

Any future external URL fetching or remote audit execution must be reviewed separately for SSRF and related server-side risks.

---

## 19. Architectural Trade-offs

### Deterministic data instead of live audit execution

Chosen because it keeps the MVP small and reproducible.

Trade-off:

The MVP does not demonstrate integration with a real Lighthouse execution pipeline.

### Separate domain layer

Chosen to make business rules testable and independent of UI/API frameworks.

Trade-off:

Adds structure to a small application.

### REST plus GraphQL

Chosen because the role explicitly values API architecture and because the two interfaces serve different consumption patterns.

Trade-off:

Two transport models increase maintenance cost.

This is acceptable because both are intentionally scoped and share the same application/domain logic.

### No database initially

Chosen to keep the MVP focused on frontend and application architecture.

Trade-off:

Persistence is simulated through deterministic repositories.

A database can be introduced only if later requirements justify it.
