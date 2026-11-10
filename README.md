# BUKLOD Classroom — Independent Web Source (DEV)

**APP_ID:** `buklod-classroom` · **STATUS:** DEV source recovery, **NOT RELEASED** from this repository.

This dedicated repository hosts the cloud-editable **Classroom web candidate**, recovered from `faust-0612/BUKLOD-Rork` branch `dev/classroom-completion-20261110` at commit `595bf55105fd94d57f27d5c81355f7ed6714082e` (`classroom-web/`). Original source files are preserved at the repository root; see `docs/UPSTREAM_CLASSROOM_WEB_README.md`.

## Web scripts

- `npm install`
- `npm test`
- `npm run build`

Build variables: `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`. Supply via provider secrets/environment, never commit actual values. No service-role/secret credentials in browser.

## Critical boundaries and gates

- This is a **web candidate**; it is not a verified reconstruction of the original standalone Expo/Android source.
- The prior Expo project UUID `14100ed1-7f25-4551-9627-09d280498241` is historical evidence only; current ownership/hosting identity remains unverified.
- `BUKLOD-Rork` is BUKLOD Main. It is **not** an allowed deployment fallback for this standalone app.
- Preserve the Gemini reference UI/design and tested controls. Preserve working Main-side compatibility until secure integration has verified parity.
- Do not merge the old Main PR #518 into Main just to complete this source move.
- True Faculty/Student academic writes, RLS, grade release, Quiz→gradebook, attendance, RLE, and Live media require real E2E proof.
- Production is blocked until the app-boundaries registry is updated **after** repository/Expo/hosting identity verification, followed by DEV→RC→Production gates.
- Public repository: no `.env`, service-role key, student PII, private academic data, encrypted archives, local recovery dumps, or production DB exports.

## Provenance

This source was migrated by cloud-side GitHub API file copies. Each imported upstream file's Git blob SHA should match the original. No AppDeploy builds/credits or production deploys are implied.
