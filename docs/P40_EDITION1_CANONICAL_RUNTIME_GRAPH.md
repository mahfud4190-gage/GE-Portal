# P40 Edition 1 — Canonical Runtime Graph

This is the single canonical dependency graph for the 12 Edition 1 pages. It follows the working Planning Workspace structure: shared foundations first, one portal shell authority, then only the business runtime required by that page. No Firebase/Auth/Firestore/business-data architecture is changed.

## Shared structure

Every page uses `<header class="top"></header>`, `<aside class="side"></aside>`, and `<main class="main">`. The shared shell authority is `assets/portal-shell.js?v=10.20.1`.

## Page graphs

### `standar.html`
1. `assets/auth.js?v=2.57`
2. `assets/data.js?v=2.57`
3. `assets/files.js?v=2.57`
4. `assets/core-v257.js?v=2.57`
5. `assets/relationships-v257.js?v=2.57`
6. `assets/permission-v257.js?v=2.57`
7. `assets/portal-shell.js?v=10.20.1`
8. `assets/app.js?v=2.57`
9. `assets/overlay-v30.js?v=30.1`
10. `assets/access-assistance-p32.js?v=32.1`
11. `assets/p33-p37-presentation.js?v=37.1`

### `inisiatif.html`
1. `assets/auth.js?v=2.57`
2. `assets/data.js?v=2.57`
3. `assets/files.js?v=2.57`
4. `assets/core-v257.js?v=2.57`
5. `assets/relationships-v257.js?v=2.57`
6. `assets/permission-v257.js?v=2.57`
7. `assets/portal-shell.js?v=10.20.1`
8. `assets/app.js?v=2.57`
9. `assets/v2554-stability.js?v=2.57`
10. `assets/overlay-v30.js?v=30.1`
11. `assets/access-assistance-p32.js?v=32.1`
12. `assets/p33-p37-presentation.js?v=37.1`

### `service-planning.html`
1. `assets/auth.js?v=2.57`
2. `assets/data.js?v=2.57`
3. `assets/core-v257.js?v=2.57`
4. `assets/relationships-v257.js?v=2.57`
5. `assets/permission-v257.js?v=2.57`
6. `assets/portal-shell.js?v=10.20.1`
7. `assets/service-planning.js?v=1.0.0`
8. `assets/overlay-v30.js?v=30.1`
9. `assets/access-assistance-p32.js?v=32.1`
10. `assets/p33-p37-presentation.js?v=37.1`

### `calendar.html`
1. `assets/auth.js?v=2.57`
2. `assets/data.js?v=2.57`
3. `assets/files.js?v=2.57`
4. `assets/core-v257.js?v=2.57`
5. `assets/relationships-v257.js?v=2.57`
6. `assets/permission-v257.js?v=2.57`
7. `assets/portal-shell.js?v=10.20.1`
8. `assets/app.js?v=2.57`
9. `assets/v2554-stability.js?v=2.57`
10. `assets/overlay-v30.js?v=30.1`
11. `assets/access-assistance-p32.js?v=32.1`
12. `assets/p33-p37-presentation.js?v=37.1`

### `planning-documents.html`
1. `assets/auth.js?v=2.57`
2. `assets/data.js?v=2.57`
3. `assets/files.js?v=2.57`
4. `assets/core-v257.js?v=2.57`
5. `assets/relationships-v257.js?v=2.57`
6. `assets/permission-v257.js?v=2.57`
7. `assets/portal-shell.js?v=10.20.1`
8. `assets/app.js?v=2.57`
9. `assets/overlay-v30.js?v=30.1`
10. `assets/access-assistance-p32.js?v=32.1`
11. `assets/p33-p37-presentation.js?v=37.1`

### `data.html`
1. `assets/auth.js?v=2.57`
2. `assets/data.js?v=2.57`
3. `assets/files.js?v=2.57`
4. `assets/core-v257.js?v=2.57`
5. `assets/relationships-v257.js?v=2.57`
6. `assets/permission-v257.js?v=2.57`
7. `assets/portal-shell.js?v=10.20.1`
8. `assets/app.js?v=2.57`
9. `assets/overlay-v30.js?v=30.1`
10. `assets/access-assistance-p32.js?v=32.1`
11. `assets/p33-p37-presentation.js?v=37.1`

### `admin.html`
1. `assets/auth.js?v=2.57`
2. `assets/data.js?v=2.57`
3. `assets/files.js?v=2.57`
4. `assets/core-v257.js?v=2.57`
5. `assets/relationships-v257.js?v=2.57`
6. `assets/permission-v257.js?v=2.57`
7. `assets/portal-shell.js?v=10.20.1`
8. `assets/app.js?v=2.57`
9. `assets/user-access-p26.js?v=26.1`
10. `assets/page-identity-v28.js?v=28.1`
11. `assets/overlay-v30.js?v=30.1`
12. `assets/access-assistance-p32.js?v=32.1`
13. `assets/p33-p37-presentation.js?v=37.1`

### `berita.html`
1. `assets/auth.js?v=2.57`
2. `assets/data.js?v=2.57`
3. `assets/files.js?v=2.57`
4. `assets/core-v257.js?v=2.57`
5. `assets/relationships-v257.js?v=2.57`
6. `assets/permission-v257.js?v=2.57`
7. `assets/portal-shell.js?v=10.20.1`
8. `assets/app.js?v=2.57`
9. `assets/overlay-v30.js?v=30.1`
10. `assets/access-assistance-p32.js?v=32.1`
11. `assets/p33-p37-presentation.js?v=37.1`

### `kontak.html`
1. `assets/auth.js?v=2.57`
2. `assets/data.js?v=2.57`
3. `assets/files.js?v=2.57`
4. `assets/core-v257.js?v=2.57`
5. `assets/relationships-v257.js?v=2.57`
6. `assets/permission-v257.js?v=2.57`
7. `assets/portal-shell.js?v=10.20.1`
8. `assets/app.js?v=2.57`
9. `assets/overlay-v30.js?v=30.1`
10. `assets/access-assistance-p32.js?v=32.1`
11. `assets/p33-p37-presentation.js?v=37.1`

### `lounge-list.html`
1. `assets/auth.js?v=2.57`
2. `assets/data.js?v=2.57`
3. `assets/files.js?v=2.57`
4. `assets/core-v257.js?v=2.57`
5. `assets/relationships-v257.js?v=2.57`
6. `assets/permission-v257.js?v=2.57`
7. `assets/portal-shell.js?v=10.20.1`
8. `assets/app.js?v=2.57`
9. `assets/lounge-planning-v29.js?v=29.1`
10. `assets/overlay-v30.js?v=30.1`
11. `assets/access-assistance-p32.js?v=32.1`
12. `assets/p33-p37-presentation.js?v=37.1`

### `branch-office-planning.html`
1. `assets/auth.js?v=2.57`
2. `assets/data.js?v=2.57`
3. `assets/files.js?v=2.57`
4. `assets/core-v257.js?v=2.57`
5. `assets/relationships-v257.js?v=2.57`
6. `assets/permission-v257.js?v=2.57`
7. `assets/portal-shell.js?v=10.20.1`
8. `assets/app.js?v=2.57`
9. `assets/overlay-v30.js?v=30.1`
10. `assets/access-assistance-p32.js?v=32.1`
11. `assets/p33-p37-presentation.js?v=37.1`

### `gaso-planning.html`
1. `assets/auth.js?v=2.57`
2. `assets/data.js?v=2.57`
3. `assets/files.js?v=2.57`
4. `assets/core-v257.js?v=2.57`
5. `assets/relationships-v257.js?v=2.57`
6. `assets/permission-v257.js?v=2.57`
7. `assets/portal-shell.js?v=10.20.1`
8. `assets/app.js?v=2.57`
9. `assets/overlay-v30.js?v=30.1`
10. `assets/access-assistance-p32.js?v=32.1`
11. `assets/p33-p37-presentation.js?v=37.1`
