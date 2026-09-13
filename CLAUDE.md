# Pulse — Claude Code Instructions

@AGENTS.md

## Claude-Specific Workflow

When working on a Pulse feature:

1. Read the relevant feature specification before editing code.
2. Read `AGENTS.md`.
3. Read the relevant sections of `spec/architecture.md`, `spec/api.md`, `spec/testing.md`, and `spec/accessibility.md` when applicable.
4. Check related ADRs before introducing architectural changes.
5. Identify acceptance criteria that the change must satisfy.
6. Propose a small implementation plan before making broad changes.
7. Prefer existing project patterns over introducing new abstractions.
8. Write or update tests as part of the feature.
9. Run targeted validation first, then the broader validation required by the repository.
10. Summarize what changed and which acceptance criteria were validated.

## Specification First

Do not implement an undocumented feature simply because it appears convenient.

When requirements change:

1. update the relevant specification;
2. review architectural consequences;
3. update tests;
4. implement the change.

## Dependency Discipline

Do not install a package merely because it is popular or convenient.

Before adding a dependency, establish:

- the problem it solves;
- why existing platform capabilities are insufficient;
- whether the dependency affects bundle size or runtime behavior;
- whether it introduces an accessibility or security concern.

Document meaningful dependency decisions.

## Code Generation

Generated code must conform to the repository's existing:

- TypeScript configuration;
- lint rules;
- formatting;
- component conventions;
- accessibility requirements;
- architecture boundaries.

Do not add explanatory comments unless the code contains a non-obvious decision that genuinely benefits from one.

## Validation

Never claim a check passed unless it was actually executed.

When a command cannot be run, state that explicitly.

## Human Review

Treat human review as the final authority on:

- product intent;
- architecture;
- accessibility;
- security;
- performance trade-offs;
- acceptance of AI-generated implementation.
