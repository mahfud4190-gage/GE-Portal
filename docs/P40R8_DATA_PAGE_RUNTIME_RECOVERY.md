# P40-R8 — Data Page Runtime Recovery

## Objective
Stabilize authenticated pages whose primary content is renderer/data driven, after the shared HTML shell was normalized.

## Source finding
The affected pages share the legacy data-page runtime stack (`data.js`, `app.js`, compatibility/project layers) and many DOMContentLoaded renderers. `planning-workspace.html` does not load that legacy renderer stack and is therefore a useful presentation/runtime reference.

Important boundary: the current affected pages do **not** directly query Firestore for their primary page datasets. Their existing renderers read `window.GEStore` / `GE_V2_1_DATA` local storage. Firebase is used by the authentication/session layer, and the Firebase client has a specific initiative-sharing sync path for external users. P40-R8 does not invent a new Firestore collection mapping and does not alter existing Firebase data.

## Changes
- Added `assets/data-page-runtime-p40.js`.
- Added a deterministic post-auth/session settle for the affected pages.
- Re-runs the existing page-owned renderer after the authenticated session is available.
- Adds a page-ready marker for runtime diagnostics.
- Normalized affected pages to the canonical asset version query strings.
- Kept page-specific data/query/CRUD functions unchanged.
- Added `tests/p40r8-data-page-runtime.js`.

## Firebase boundary
No Firestore writes, rules, schema, or collections were changed.
The stabilizer only calls the existing Firebase session/profile runtime and then invokes existing page renderers.

## Validation
`npm run build` passed all existing contracts plus `P40R8_DATA_PAGE_RUNTIME_PASS`.

Browser validation is still required for the affected pages.
