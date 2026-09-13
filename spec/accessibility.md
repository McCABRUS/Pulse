# Pulse — Accessibility Specification

## 1. Accessibility Goals

Pulse targets WCAG 2.2 Level AA for the MVP.

Accessibility is treated as a product requirement and engineering constraint, not as a final verification step.

The goal is to ensure that core Pulse workflows remain usable through:

- keyboard interaction;
- semantic HTML;
- assistive-technology-compatible semantics;
- predictable focus behavior;
- understandable states and errors;
- reduced-motion preferences.

---

## 2. Semantic HTML

Use native HTML elements whenever they provide the required semantics.

Examples:

- `button` for actions;
- `a` for navigation;
- `nav` for navigation landmarks;
- `main` for primary content;
- `header` and `footer` for structural regions;
- `form`, `label`, and native inputs for forms.

ARIA must not replace native semantics when native HTML is sufficient.

---

## 3. Keyboard Navigation

All interactive functionality must be usable without a mouse.

Requirements include:

- logical tab order;
- keyboard-operable controls;
- visible focus;
- no keyboard traps;
- correct activation behavior;
- Escape handling where applicable.

Custom interactive elements require explicit keyboard behavior and should be avoided when native controls provide the required behavior.

---

## 4. Focus Management

Focus management is required for overlays and other stateful interactions.

When a dialog opens:

1. focus moves to the dialog or its first appropriate control;
2. focus remains within the dialog while it is modal;
3. Escape closes the dialog when supported;
4. focus returns to the triggering element after close.

Focus behavior must be tested.

---

## 5. Accessible Names

Every interactive control must have an accessible name.

Controls must not rely exclusively on:

- placeholder text;
- visual icons;
- CSS content;
- surrounding layout.

Icon-only buttons require an accessible name.

---

## 6. Accessible Descriptions

Descriptions should be used when a user needs additional context to understand:

- an error;
- a form field;
- a technical metric;
- a dialog;
- a status or warning.

Descriptions should not unnecessarily repeat visible labels.

---

## 7. Findings and Severity

Finding severity must not be communicated only through color.

The UI should use:

- textual severity labels;
- appropriate semantic information;
- visual differentiation as a supporting mechanism.

Examples:

```text
Critical
Serious
Moderate
Minor
```

Any iconography must not be the sole source of meaning.

---

## 8. Metrics and Data Visualization

Performance and health information must remain understandable without relying exclusively on charts or color.

For example:

```text
LCP
1.8s
Good
```

is preferable to communicating only:

```text
[green circle]
```

Charts must provide accessible alternatives where appropriate.

---

## 9. Dialogs

Dialogs must:

- have an accessible name;
- expose the appropriate modal semantics;
- manage focus correctly;
- support keyboard interaction;
- close predictably;
- restore focus to the triggering element.

The dialog implementation should use established accessibility patterns rather than a custom ad-hoc implementation.

---

## 10. Loading States

Loading states must communicate relevant asynchronous activity without producing excessive or disruptive announcements.

When appropriate, use status semantics or a live region.

Loading indicators must not depend solely on animation.

---

## 11. Error States

Errors must:

- be understandable;
- identify the relevant problem;
- remain perceivable without color;
- avoid technical stack traces;
- provide recovery guidance where possible.

Form errors must be associated with the corresponding controls.

---

## 12. Live Regions

Live regions should be used selectively.

Appropriate examples may include:

```text
Audit completed.
Comparison updated.
Unable to load audit.
```

Do not use live regions for every UI change.

Announcements must not become noisy for screen-reader users.

---

## 13. Reduced Motion

If Pulse introduces animation, non-essential motion must respect:

```text
prefers-reduced-motion: reduce
```

Reduced-motion behavior must preserve functionality.

Essential state changes should not depend on animation.

---

## 14. Color and Contrast

Color must not be the sole mechanism for communicating:

- severity;
- success;
- regression;
- improvement;
- errors.

Text and interactive states must maintain sufficient contrast according to the WCAG target.

---

## 15. Responsive Accessibility

Accessibility must remain functional across viewport sizes.

Responsive changes must not:

- hide essential information without an alternative;
- create horizontal scrolling for normal content;
- break keyboard navigation;
- obscure focused controls.

---

## 16. Automated Accessibility Testing

The test suite must include automated axe-based checks.

At minimum, coverage should include:

- project overview;
- audit detail;
- findings interaction;
- comparison experience.

Automated checks are a safety net, not proof of full WCAG conformance.

---

## 17. Manual Accessibility Testing

The project must include a manual checklist covering:

- keyboard-only navigation;
- focus visibility;
- focus order;
- dialogs;
- Escape behavior;
- focus restoration;
- reduced motion;
- meaningful error states.

The results should be documented in the repository.

---

## 18. Accessibility Definition of Done

A feature is not complete when:

- required keyboard interaction does not work;
- focus is lost unexpectedly;
- interactive controls lack accessible names;
- information is conveyed only through color;
- supported dialogs have incorrect focus behavior;
- automated accessibility checks expose an unresolved supported defect without documentation.
