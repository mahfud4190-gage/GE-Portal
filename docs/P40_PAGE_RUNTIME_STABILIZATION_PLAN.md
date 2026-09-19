# P40 — Page Runtime Stabilization Plan

## Objective

Stabilize the multi-page portal without changing Firebase data, Firestore rules, authentication authority, or P39 business data.

## Shared fixes in this wave

- Navigation capture is deterministic and bypasses historical R9/R10 transition flicker.
- Sidebar scrolling is owned by one native scroll container.
- Presentation MutationObserver work is bounded to the active main content area.
- Overlay promotion no longer observes the entire document body; changes are batched per animation frame.
- Repeated airport/map DOM rendering is made idempotent during a page lifecycle.
- Calendar browser identity is corrected.

## Page-specific validation matrix

| Page family | Primary runtime | Required browser check |
|---|---|---|
| Network / Airport Map | `network-v257.js`, `app.js` | open, filter, marker/detail interaction, back/forward |
| Readiness | `readiness-v257.js` | open, station selection, assessment panel |
| Capability / Standards | core + relationship modules | open, station/service filters, tables |
| Initiative | `portal-shell.js`, initiative modules | open, filter, detail/edit modal |
| Calendar / Project Tracking | `app.js`, `v254-project.js`, `v2554-stability.js` | open, agenda/calendar, add/edit modal |
| Planning | planning HTML + core/relationship modules | open every planning route and return via sidebar |
| Documents / Data | `files.js`, `app.js` | open, search/filter, document interaction |
| News / Contact | `app.js` | open, render content, form interaction |
| User / Access | `auth.js` + account modules | open only with legitimate authorized session |

## Documents

Future documents can be added through the existing document/file workflow. This wave does not seed, replace, migrate, or rewrite Firebase document records.

## Validation boundary

Static/build checks can establish source consistency and syntax. Real browser hydration, authenticated Firebase reads/writes, and production interaction remain browser-validation tasks and must not be reported as validated without execution in a compatible browser environment.
