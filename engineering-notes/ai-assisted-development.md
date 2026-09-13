# AI-Assisted Development

## Purpose

Pulse uses AI-assisted development as an engineering workflow, not as a product feature.

The objective is to demonstrate a controlled process in which AI can assist with implementation while specifications, tests, automated validation, and human review remain authoritative.

## Intended Workflow

```text
Specification
      ↓
Task decomposition
      ↓
AI-assisted implementation
      ↓
Test generation / test suggestions
      ↓
Automated validation
      ↓
Human review
      ↓
Merge
```

## Rules

AI-generated code must not be treated as correct by default.

The agent must:

- follow repository instructions;
- treat specifications as authoritative;
- avoid introducing unsupported dependencies;
- preserve architectural boundaries;
- propose tests for behavioral changes;
- preserve accessibility requirements;
- report uncertainty or assumptions;
- avoid making architectural changes silently.

## Human Review

Human review remains responsible for:

- validating product intent;
- reviewing architecture;
- checking security implications;
- evaluating accessibility;
- validating performance decisions;
- accepting or rejecting generated implementation.

## Evidence

Where useful, prompts or engineering notes may be stored under:

```text
prompts/
engineering-notes/
```

The repository should capture meaningful examples of AI-assisted work rather than every AI interaction.

## No Simulated History

The project must not fabricate AI prompts, agent actions, or review history that did not occur.

Documentation should describe actual development workflow.
