# P40-R12 — Edition 1 Shell Bootstrap Ordering Recovery

## Affected pages

`standar.html`, `inisiatif.html`, `service-planning.html`, `calendar.html`, `planning-documents.html`, `data.html`, `admin.html`, `berita.html`, `kontak.html`, `lounge-list.html`, `branch-office-planning.html`, `gaso-planning.html`.

## Root-cause finding

The 12 Edition 1 data pages use the empty `.top` / `.side` shell contract but load a substantially larger deferred runtime stack than the working `planning-workspace.html`. In those pages `portal-shell.js` was the **last deferred script**, after compatibility, application, stability, overlay/access-assistance, and presentation layers.

The observed symptom is consistent with the shared shell not becoming the first runtime presentation authority: page content is present while the final Header/Sidebar remains unhydrated and the browser can remain in a loading state.

## Correction

No Firebase, Firestore, authentication, business data, business renderer, CSS, or `assets/portal-shell.js` source was changed.

For all 12 pages, the existing canonical `portal-shell.js?v=10.20.1` reference remains deferred but is moved into the document head immediately after the `r9-boot` and `portal.css` bootstrap and before the legacy/deferred page runtime layers.

This makes the shared shell the first deferred runtime authority after the synchronous authentication/data foundation, while retaining all existing page-specific runtime files.

## Preservation

- Firebase client/config: unchanged
- Firestore rules/data: unchanged
- Authentication: unchanged
- `assets/portal-shell.js`: unchanged
- `assets/portal.css`: unchanged
- page business content: unchanged
- page-specific scripts: retained
- routes: unchanged

## Validation

Static gate: `P40R12_EDITION1_SHELL_BOOTSTRAP_ORDER_PASS (12 pages)`.

Browser validation of the live Deploy Preview is still required before declaring operational completion.
