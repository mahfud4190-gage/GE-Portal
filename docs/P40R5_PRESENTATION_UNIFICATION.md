# P40-R5 — Presentation Unification

## Objective
Remove the visible legacy shell from final user pages and make the shared final shell the only static shell host.

## Changes
- Converted legacy static top/header and sidebar markup on affected final user pages to empty shared-shell hosts.
- Preserved each page's existing `<main class="main">` content and page scripts.
- Added presentation-only normalization for common legacy page structures (`hero`, `page-header`, `title`, `card`, filters, buttons, journey tabs, initiative grids and forms) so they follow the final visual language.
- Added a contract test ensuring final user pages cannot retain the legacy static top/sidebar shell.

## Firebase boundary
No Firebase client, Auth, Firestore rules, Netlify Functions, or data structures were changed.

## Runtime intent
A page navigation must not render the old `GROUND EXPERIENCE GARUDA INDONESIA` shell while the final portal shell is loading. The static host is now neutral; `portal-shell.js` owns the final shell.

## Validation status
Static contract/build validation required. Browser validation remains required for navigation, page runtime, modal, map, calendar and data rendering.
