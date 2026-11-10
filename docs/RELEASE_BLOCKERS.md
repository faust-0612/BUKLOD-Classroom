# BUKLOD Classroom independent release gates

**Source**: root web app migrated from `BUKLOD-Rork` `classroom-web` at commit `595bf55105fd94d57f27d5c81355f7ed6714082e`.

**Already proven:** isolated web source and synthetic tests existed upstream. Copying those tests does **not** make live academic transactions verified.

**Required before any release:** (1) verify current Expo ownership and target URL; (2) reconcile app-boundaries metadata from `null` to independently verified dedicated details; (3) run focused unit/build checks; (4) use authorized isolated Faculty/Student/Dual accounts for real RLS/write/idempotency acceptance; (5) validate Quiz→gradebook and Attendance→gradebook without double writes; (6) validate grade release and confidential-record isolation; (7) test real Live Stream join/media/screenshare/network fallback; (8) promote exact tested immutable RC; (9) confirm production artifact and rollback.

**Do not:** deploy to BUKLOD Main OTA/Expo, run paid AppDeploy generation, commit secrets, or claim native Android completeness from a Vite web app.
