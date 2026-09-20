# GE Portal R3 Locked Rebuild

Clean rebuild from P40 reference.

- Physical HTML: 2 (`index.html`, `login.html`)
- Logical page routes preserved: 50
- Edition 1 visual baseline retained and consolidated into `assets/design.css`.
- Proven Firebase login flow retained.
- Business data path: `portalData/<group>/records/<id>`; users remain `users/<uid>`.
- No e1 duplicate HTML, route adapter, modal-fix, stability override, compatibility chain, or old-page redirect layer.
- P40 source package is reference only and is not included.
