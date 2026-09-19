# P40-R3 — P30 Overlay / Sidebar Runtime Root-Cause Recovery

## Objective
Recover runtime stability by removing duplicate presentation/runtime authorities rather than adding another patch layer.

## Findings
- `assets/portal-shell.js` contained an additional R10 `app-shell` authority that re-created the sidebar wrapper/toggle, persisted/restored sidebar scroll, added navigation `r10-leaving`, and independently normalized modal roots.
- `assets/overlay-v30.js` already provides the portal-wide overlay normalization, focus, Escape, pointer/layer, and scroll-lock authority.
- `portal-shell.js` also contained the R9 navigation `r9-leaving` state, creating another transition-state authority.
- Shared-shell consolidation removed the page-owned static Calendar link; the shared navigation therefore needs an explicit `calendar.html` entry.

## Changes
1. Retired the duplicate R10 `app-shell` block from `portal-shell.js`.
2. Retired the R9 navigation `r9-leaving` capture from the Initiative renderer.
3. Added `Calendar & Project Tracking` to the shared planning navigation used by the applicable POVs.
4. Kept `overlay-v30.js` intact as the single portal-wide overlay authority.
5. Updated frozen hash contracts only for the intentional `portal-shell.js` runtime correction.

## Firebase boundary
No Firebase client, authentication, Firestore rules, or Netlify function code is modified by this recovery.

## P30 status
**MINIMALLY CORRECTED** — the duplicate shell/overlay lifecycle authority is removed. `overlay-v30.js` remains in place and is not replaced by a new overlay implementation.

## Browser validation
Required before operational completion: Calendar modal; Initiative modal; Airport map/detail; one Planning dialog. Each must be opened, interacted with, closed, navigated away from, and opened again, with no permanent backdrop, pointer block, scroll lock, or endless loading.
