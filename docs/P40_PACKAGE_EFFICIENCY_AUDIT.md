# P40 Package Efficiency Audit

## Executive finding
The package works, but its maintenance model is inefficient: 74 physical HTML pages duplicate global shell/navigation markup and many repeat the same dependency declarations. A global navigation/header change therefore risks touching dozens of files and creating drift.

## Baseline measured
- 234 files, ~19 MB unpacked.
- 74 root HTML pages (~599 KB combined).
- 84 JavaScript files and only 3 CSS files.
- 57 pages contained the shared sidebar shell.
- Common runtime repeated across most pages: access-assistance (72 refs), presentation (60), overlay (59), portal-shell (59).
- 24 pages contain >1 KB inline JavaScript; 14 pages contain >1 KB inline CSS.
- OCR assets account for the majority of package weight (~12.9 MB across traineddata/WASM/compressed variants) and should remain lazy-loaded only by OCR flows.
- `assets/app.js` (~562 KB), `edition1-business-runtime.js` (~623 KB), and `portal.css` (~446 KB) are large shared monoliths. They are cached in-browser, but remain high-coupling maintenance hotspots.

## Refactor implemented
1. Introduced a build-generated static site (`dist/`) rather than treating every deploy HTML page as a hand-maintained source file.
2. Extracted 56 shell-based pages into `src/pages/*.main.html` content fragments.
3. Centralized global chrome into two intentional shell variants:
   - `src/layouts/portal-shell-legacy.html`
   - `src/layouts/portal-shell-edition1.html`
   This preserves the approved legacy and Edition 1 presentation families without forcing one UI onto the other.
4. Kept 18 structurally special pages under `src/standalone/` because forcing them into the common shell would create regression risk.
5. Added `tools/build-site.mjs` to regenerate deployable physical routes in `dist/`.
6. Deployment should publish `dist`, while Netlify Functions remain in `netlify/functions`.

## New maintenance rule
- Header/sidebar/global navigation: edit one of the two shell layout files, not every page.
- Page content: edit only the matching `src/pages/<page>.main.html` fragment.
- Special pages: edit `src/standalone/<page>.html` only when the page genuinely does not use the common portal shell.
- Never manually edit generated files in `dist/`; rebuild instead.

## Next optimization candidates (not forced in this pass)
- Split `app.js` and `edition1-business-runtime.js` by feature/domain after coverage is available.
- Move inline page JS/CSS into page modules to reduce HTML coupling.
- Introduce dependency profiles (core, planning, lounge, admin, OCR) so page head declarations are also centrally managed.
- Keep OCR language/WASM files out of normal preloads; load them only when OCR is invoked.
- Consolidate old compatibility/patch scripts only after regression tests prove equivalence; deleting them now would be high risk.

## Why this is safer than a framework rewrite
The package remains a static multi-page site with the same physical URLs at deployment time. The refactor changes the source-of-truth and build process, not the business data model, Firebase collections, or Netlify Function API.
