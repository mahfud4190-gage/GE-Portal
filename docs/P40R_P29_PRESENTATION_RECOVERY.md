# P40-R — P29 Presentation Recovery

## Objective

Recover the proven P29 Initiative & Improvement presentation/runtime path by removing later duplicate presentation/runtime mutation layers instead of adding another workaround layer.

## First recovery target

`inisiatif.html` remains the original page-owned/V224 Initiative workflow. No shared-shell HTML consolidation is applied to this page in P40-R.

Removed from `assets/portal-shell.js`:

- R10 `app-shell.js` sidebar/state/transition/overlay mutation layer;
- R10.13 shared Initiative renderer override;
- duplicate R10 sidebar scroll restoration/state persistence;
- duplicate R10 navigation-leaving transition;
- duplicate R10 modal-root MutationObserver.

The page therefore returns to its existing page-owned Initiative renderer instead of being replaced by a later shared renderer.

## Sidebar recovery

The existing final shell geometry is retained. The authoritative sidebar becomes the native vertical scroll container, and the active-navigation inset line is removed. No new navigation runtime is introduced.

## Protected boundary

Unchanged:

- Firebase client/configuration
- Firebase Authentication / Session Profile
- Firestore rules
- existing production data
- P29 business/data logic
- P32 Access Assistance
- Netlify Functions
- role/access/scope/permission contracts

Only the presentation/shared-shell file `assets/portal-shell.js` was intentionally reopened. Its previous P38 frozen hash is updated as a controlled P40-R presentation change. Protected Firebase/Auth/Firestore hashes remain unchanged.

## Validation

`P40R_P29_PRESENTATION_RECOVERY_CONTRACT_PASS`

The gate verifies removal of the duplicate R10 shell/Initiative layers, preservation of the page-owned V224 Initiative workflow, native sidebar scrolling, removal of the active-nav inset line, and frozen hashes for protected Firebase/Auth/Firestore files.

The full existing build/regression chain is required. Browser validation remains a separate gate and is not claimed by this package.
