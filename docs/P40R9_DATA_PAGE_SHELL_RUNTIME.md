# P40-R9 — Data-Page Canonical Shell Runtime

Affected data-driven pages now receive the same canonical empty shell host pattern as Planning Workspace. A synchronous shared-shell bootstrap renders the single shared shell before deferred legacy/data runtimes execute; the existing portal-shell renderer becomes a guarded fallback and cannot overwrite the canonical shell after successful boot.

No Firebase/Auth/Firestore rules or data model changes. Existing page data/query/CRUD scripts remain in place. Legacy footer/back-to-top presentation was removed from the affected pages.

Static validation: `P40R9_DATA_PAGE_SHELL_RUNTIME_PASS`. Browser validation remains required.
