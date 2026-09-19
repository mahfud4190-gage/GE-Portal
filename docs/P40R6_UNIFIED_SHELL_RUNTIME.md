# P40R6 — Unified Empty-Shell Runtime

Planning Workspace is the canonical HTML structure: authenticated pages keep an empty shared `header.top` and `aside.side`, while `main.main` remains page-owned. The shared `portal-shell.js` is the only runtime that populates the shell.

P40R6 also normalizes extensionless Netlify paths such as `/lounge-list` to `lounge-list.html`, preventing the shared shell from being skipped on pretty URLs.

No Firebase/Auth/Firestore data contract is changed.
