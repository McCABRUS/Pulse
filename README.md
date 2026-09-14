# Pulse

Pulse is a personal web quality platform for exploring how a modern frontend application can collect, validate, compare, and present technical quality signals for a web project.

**Live demo:** [https://pulse-zeta-smoky.vercel.app/](https://pulse-zeta-smoky.vercel.app/)

The application provides project overviews, point-in-time audits, audit comparison, findings, and APIs for accessing the same domain data through different transport layers.

## Overview

Pulse is built around a simple flow:

```text
Project
   ↓
Audit
   ↓
Metrics
   ↓
Quality scores
   ↓
Findings
   ↓
Comparison
```

The current application uses deterministic data so that domain behavior, UI, accessibility, and API contracts remain reproducible during development and testing.

## Features

### Project overview

The project overview presents:

- overall health;
- performance score;
- accessibility score;
- API health score;
- latest audit information;
- navigation to the latest audit.

### Audit detail

An audit contains:

- overall score;
- performance metrics and score;
- accessibility metrics and score;
- API health metrics and score;
- findings;
- evidence and recommendations.

### Audit comparison

Two audits from the same project can be compared across:

- overall health;
- performance;
- accessibility;
- API health.

Each comparison exposes:

- previous score;
- current score;
- delta;
- status (`improved`, `regressed`, or `unchanged`).

### APIs

Pulse exposes both REST and GraphQL APIs.

REST is used for resource-oriented access and commands.

GraphQL is used for flexible composite reads.

Both transports delegate business behavior to the same application and domain layers.

## Architecture

Pulse is organized into four logical layers:

```text
Presentation
    ↓
Application
    ↓
Domain
    ↓
Infrastructure
```

### Presentation

Next.js routes and React components are responsible for:

- page composition;
- UI state;
- accessibility;
- interaction;
- visual presentation.

### Application

Application queries and use cases coordinate repositories and domain services.

### Domain

The domain contains the core concepts and rules for:

- audits;
- scoring;
- comparisons;
- findings.

The domain does not depend on React, Next.js, HTTP, GraphQL, or infrastructure validation libraries.

### Infrastructure

Infrastructure contains:

- repositories;
- REST handlers;
- GraphQL schema and resolvers;
- runtime validation;
- external audit adapters;
- deterministic data.

## Design patterns

Pulse currently uses three patterns where they provide a concrete separation of responsibility.

### Repository

Repositories isolate data retrieval from application and domain behavior.

### Adapter

External audit payloads are validated and translated into Pulse domain models.

```text
External payload
      ↓
Runtime validation
      ↓
Provider DTO
      ↓
Adapter
      ↓
Pulse domain model
```

The external provider supplies observations. Pulse owns the domain score calculations.

### Strategy

Scoring algorithms share a common contract while accepting different metric inputs.

```text
ScoreStrategy<TInput>
       │
       ├── PerformanceScoreStrategy
       ├── AccessibilityScoreStrategy
       └── ApiHealthScoreStrategy
```

A `HealthScoreCalculator` composes the strategies to produce dimension scores and the overall score.

## Validation

Data crossing external boundaries is validated at runtime with Zod.

The validation layer is intentionally kept in infrastructure so the application and domain layers remain independent of the validation library.

## Technology

- Next.js
- React
- TypeScript
- CSS Modules
- CSS custom properties
- Vitest
- React Testing Library
- Playwright
- axe
- GraphQL
- Zod
- Lighthouse
- GitHub Actions
- Vercel

## Testing

Pulse uses multiple levels of automated testing.

### Unit tests

Domain rules, scoring strategies, comparison logic, validation, and adapters.

### Component tests

React components and their accessible behavior.

### Integration tests

Application queries, repositories, REST handlers, and GraphQL behavior.

### End-to-end tests

Critical browser journeys across the real Next.js application.

### Accessibility

Playwright + axe checks are used to detect accessibility regressions in the rendered application.

## Performance

Performance is measured against the production build using Lighthouse.

Current production baseline:

```text
Performance       99
Accessibility    100
Best Practices   100
SEO              100

FCP    0.9 s
LCP    2.2 s
CLS    0
TBT    50 ms
Speed Index 0.9 s
```

Lighthouse is also available as an automated quality gate.

Generated Lighthouse reports are kept out of version control.

## Deployment

Pulse is deployed to Vercel and connected to the GitHub repository for production deployments.

Live application:

```text
https://pulse-zeta-smoky.vercel.app/
```

## Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Run unit and component tests:

```bash
npm run test
```

Run type checking:

```bash
npm run typecheck
```

Run linting:

```bash
npm run lint
```

Build for production:

```bash
npm run build
```

Run the production server:

```bash
npm start
```

Run end-to-end tests:

```bash
npm run test:e2e
```

Run Lighthouse:

```bash
npm run lighthouse
```

## Quality checks

The main quality checks can be run locally:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:e2e
npm run lighthouse
```

These checks are also executed by the GitHub Actions CI workflow.

## Project structure

```text
src/
├── app/
├── components/
├── domain/
├── application/
└── infrastructure/

tests/
└── e2e/

spec/
└── ...

engineering-notes/
└── ...
```

The structure follows responsibility boundaries rather than introducing abstractions for their own sake.

## Engineering principles

Pulse follows a few simple principles:

- keep domain rules framework-independent;
- validate external data at runtime;
- prefer explicit boundaries over implicit coupling;
- keep client-side code small when interactivity is not required;
- use semantic HTML;
- treat accessibility as a product requirement;
- measure performance before optimizing;
- prefer the smallest abstraction that solves a real problem.
