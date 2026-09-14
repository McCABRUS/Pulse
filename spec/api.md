# Pulse — API Specification

## 1. API Goals

The Pulse API layer must provide predictable, validated access to project and audit data while keeping transport concerns separate from the domain model.

The API must:

- use explicit contracts;
- validate runtime input;
- provide meaningful errors;
- keep business rules outside transport handlers;
- expose REST and GraphQL for distinct purposes;
- remain deterministic for the MVP.

---

## 2. API Boundaries

Pulse uses two API styles.

### REST

Used for:

- resource-oriented operations;
- commands;
- predictable HTTP semantics.

### GraphQL

Used for:

- composite read views;
- flexible selection of related data;
- read-oriented UI composition.

Both APIs must use the same application/domain rules.

---

## 3. REST API

### 3.1 List projects

```http
GET /api/projects
```

Response shape:

```json
{
  "projects": [
    {
      "id": "project-1",
      "name": "Acme Commerce"
    }
  ]
}
```

---

### 3.2 Get project

```http
GET /api/projects/:id
```

Returns the requested project and summary information required by resource-oriented consumers.

Possible errors:

```text
404 Not Found
```

when the project does not exist.

---

### 3.3 Get project by id

```http
GET /api/projects/:id
```

Returns a single project using the application project model.

### Success

```http
200 OK
```

Example response:

```json
{
  "project": {
    "id": "project-1",
    "name": "Acme Commerce",
    "latestAudit": {
      "id": "audit-1",
      "projectId": "project-1",
      "createdAt": "2026-09-13T14:32:00Z",
      "overallScore": 92,
      "performance": {
        "score": 94
      },
      "accessibility": {
        "score": 98
      },
      "apiHealth": {
        "score": 84
      },
      "findings": []
    }
  }
}
```

### Not found

```http
404 Not Found
```

Example:

```json
{
  "error": {
    "code": "PROJECT_NOT_FOUND",
    "message": "The requested project could not be found."
  }
}
```

### Invalid identifier

```http
400 Bad Request
```

The route must reject an empty or invalid project identifier before invoking the application use case.

---

### 3.4 Get audit

```http
GET /api/audits/:id
```

Returns an individual audit.

Possible errors:

```text
404 Not Found
```

when the audit does not exist.

---

### 3.5 Create audit

```http
POST /api/audits
```

The MVP may use this endpoint to request creation of a deterministic audit.

Example request:

```json
{
  "projectId": "project-1"
}
```

The request must be runtime-validated.

A successful operation returns the created audit representation.

---

### 3.6 Compare audits

```http
POST /api/audits/:id/compare
```

Example request:

```json
{
  "previousAuditId": "audit-1"
}
```

The application layer validates that both audits:

- exist;
- belong to the same project;
- contain comparable metrics.

The response contains the normalized comparison result.

---

## 4. REST Status Codes

The API should use status codes consistently.

Expected examples:

```text
200 OK
201 Created
400 Bad Request
404 Not Found
409 Conflict
422 Unprocessable Entity
500 Internal Server Error
```

The exact mapping should be finalized during implementation.

---

## 5. GraphQL API

GraphQL provides flexible read composition.

The initial schema should expose:

```text
Query
├── project
└── projects
```

Core types:

```text
Project
Audit
Performance
Accessibility
ApiHealth
Finding
Recommendation
Comparison
```

---

## 6. Example GraphQL Query

```graphql
query ProjectOverview($id: ID!) {
  project(id: $id) {
    id
    name
    healthScore
    latestAudit {
      id
      createdAt
      overallScore
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
      findings {
        id
        severity
        category
        title
      }
    }
  }
}
```

---

## 7. GraphQL Type Principles

GraphQL types should represent domain concepts.

They must not expose:

- database implementation details;
- internal repository structures;
- private infrastructure fields;
- secrets;
- raw internal error objects.

Resolver functions should delegate to application services.

---

## 8. Validation

Every external request must be validated at runtime.

Validation applies to:

- path parameters;
- query parameters;
- REST request bodies;
- GraphQL arguments;
- external adapter payloads.

Invalid input must never be passed directly into domain logic.

The selected schema-validation library will be documented in the implementation stack.

---

## 9. Error Model

REST errors should expose a stable public shape.

Example:

```json
{
  "error": {
    "code": "PROJECT_NOT_FOUND",
    "message": "The requested project could not be found."
  }
}
```

GraphQL errors should expose a stable public error code where supported by the implementation.

Internal stack traces must not be returned to users.

---

## 10. Domain/API Separation

API DTOs are not domain entities.

The intended relationship is:

```text
HTTP / GraphQL
      |
      v
DTO
      |
      v
Mapper
      |
      v
Domain model
```

The UI should consume stable application-facing structures instead of depending directly on transport-specific payloads.

---

## 11. Security Considerations

The MVP should:

- validate all externally supplied input;
- avoid returning internal error details;
- avoid exposing secrets in responses;
- sanitize user-controlled or external text before unsafe rendering;
- avoid trusting arbitrary API payloads.

Future remote URL analysis must include explicit SSRF protections.

---

## 12. API Contract Testing

The test suite must verify:

- valid request acceptance;
- invalid request rejection;
- expected response shape;
- error shape;
- relevant status codes;
- GraphQL query behavior.

API schemas should be treated as contracts.

Changes to contracts must be reviewed before implementation.

---

## 13. API Decision Rule

An operation should use REST when it primarily represents a resource or command.

An operation should use GraphQL when the consumer benefits from selecting a composed read model across related entities.

The existence of both interfaces is not itself a reason to duplicate functionality.

When a REST and GraphQL operation represent the same business capability, they must delegate to the same application/domain behavior.

---

## 14. Next.js Internal Consumption

The Next.js server application should not call its own REST endpoints merely to force internal traffic through HTTP.

Server Components and server-side application code should prefer calling the application layer directly when they already run inside the same process.

The REST API exists as an explicit transport boundary for external consumers and for contract testing.

This avoids an unnecessary:

```text
Server Component
    ↓
HTTP
    ↓
Route Handler
    ↓
Application
```

hop when the application layer can be called directly.

The intended architecture is:

```text
Internal server consumer
        ↓
Application layer

External REST consumer
        ↓
REST Route Handler
        ↓
Application layer
```
