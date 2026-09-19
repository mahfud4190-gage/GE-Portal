# P40 Runtime Recovery — Shared Presentation & Page Shell Consolidation

## Objective

Restore the approved portal runtime pattern without reverting P26/P28/P30/P31/P32/P39 work and without changing Firebase/Firestore data.

The recovery uses the P40B-3A shared-shell contract as the current source of truth: ordinary pages expose only the required `.top`, `.shell`, `.side`, and `.main` hosts; `assets/portal-shell.js` remains the single shared shell owner.

## Why this wave is different

The observed regression pattern is cross-page:

- legacy shell/theme appears before the final shell;
- menu interaction can flicker or stop responding;
- some pages hang while switching routes;
- Calendar retained the wrong document title;
- shared DOM observers repeatedly rescan large page trees.

Therefore this wave does not create a separate replacement shell or hard-code another navigation model. It removes duplicated static shell markup from the affected ordinary pages and keeps the existing canonical shell/runtime authority.

## Included previous uncommitted work

The following four files from the prior uncommitted presentation/runtime package are intentionally included because they remain relevant:

- `assets/p33-p37-presentation.js`
- `assets/app.js`
- `assets/portal.css`
- `calendar.html`

Their changes are presentation/runtime-only. They do not change Firebase data or authentication.

## Page shell consolidation

The following pages now retain empty shell hosts and page-owned content while removing duplicated legacy header/sidebar markup:

- `berita.html`
- `bo-space.html`
- `branch-office-planning.html`
- `gaso-planning.html`
- `layanan.html`
- `map.html`
- `planning-documents.html`
- `post-flight.html`
- `post-journey.html`
- `pre-flight.html`
- `pre-journey.html`
- `service-planning.html`
- `standar.html`
- `station-material.html`
- `touchpoint.html`
- `inisiatif.html`

Pages that already satisfied the minimal-host contract were not rewritten merely for consistency.

Special/auth/security/high-risk pages were not mass-converted.

## Runtime behavior

`assets/portal-shell.js` is unchanged and remains the canonical shared shell implementation.

The presentation layer now limits table/status observation to the page `.main` region and batches mutations instead of observing the entire document body for every change.

The app layer removes the previous body-wide table-render observer and exposes an explicit refresh hook. Selected map/airport render hooks are made idempotent so identical render requests do not repeatedly rebuild the same DOM during a page lifecycle.

Navigation presentation is stabilized by the included P40 presentation layer without changing authorization or route ownership.

## Protected boundary

Unchanged:

- `assets/auth.js`
- `assets/firebase-client.js`
- `assets/portal-shell.js`
- `assets/overlay-v30.js`
- `assets/access-assistance-p32.js`
- `firestore.rules`
- Netlify Functions
- P29 business/data implementation
- P39 Asset & Facility implementation
- Firebase production data

## Validation

Static/runtime contract:

`P40_RUNTIME_RECOVERY_CONTRACT_PASS`

Full available build:

- `PACKAGE_VERIFY_PASS`
- `REGRESSION_AUDIT_PASS`
- `P29_LOUNGE_PLANNING_PASS`
- `P31_AUTHENTICATION_CONTRACT_PASS`
- `P31_ROLE_POV_RUNTIME_PASS`
- `P31A_SESSION_PROFILE_SERVICE_PASS`
- `P31B_LOGIN_ACCESS_ASSISTANCE_PASS`
- `P32_ACCESS_ASSISTANCE_ADMIN_PASS`
- `P32_ACCESS_ASSISTANCE_RUNTIME_PASS`
- `P33_P34_P35_P36_P37_PRESENTATION_CONTRACT_PASS`
- `P27_PROFILE_SELF_SERVICE_CONTRACT_PASS`
- `P38_REPOSITORY_HYGIENE_PASS`
- `P40_RUNTIME_RECOVERY_CONTRACT_PASS`

Browser visual validation remains a separate gate. This package must not be described as browser-validated until the deployed authenticated portal has been inspected in a real browser.
