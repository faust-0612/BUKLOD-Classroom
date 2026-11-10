# CODEX EXECUTION CONTRACT — BUKLOD CLASSROOM SCHOOL-READY COMPLETION
**Date:** 2026-11-10 · **APP_ID:** `buklod-classroom` · **Priority:** full school-opening readiness
**Dedicated repository:** `faust-0612/BUKLOD-Classroom`
**Working branch:** `dev/classroom-source-recovery-20261110` (or a new isolated implementation branch from this verified candidate)
**Recovered source:** commit `b968fd4424333e79a2469817edda88d44deeb1ea`, original `BUKLOD-Rork:classroom-web` at `595bf55105fd94d57f27d5c81355f7ed6714082e`.
**Background:** Source moved with 20/20 Git blob SHA matches. Current repository is PUBLIC, so all commits and issues must remain free of confidential data.

## MANDATE AND DEFINITION OF DONE

Fully implement the previously approved BUKLOD Classroom **LMS + academic SIS workflows**, integrating BUKLOD Main, Faculty, Quiz, Attendance, QuickCheck, Grade Viewer, and Connect, for real school use. Deliver functional, secure workflows, not a decorative UI, disconnected buttons, mock responses, or unverifiable reports.

Continue through inspection -> gap matrix -> coordinated implementation -> focused automated tests -> controlled authenticated E2E -> frozen RC -> independent release verification, provided the exact permissions and release ownership are proven. If one external capability is blocked, isolate that blocker, continue all independent work, and report only the precise missing permission. Do not ask for routine proceed/confirmation.

**School-ready gate:** a faculty member can create and configure a class, enroll/import real or isolated test students with correct identity, publish syllabus/materials, create and grade activities and secure assessments, take/verify attendance, run class communications/live session, complete grade cycles and release individual grades, and students can reliably access only their own information. Audit and recovery must work. Every control and state must have an authoritative backend implementation and pass appropriate testing.

## CRITICAL ARCHITECTURE / PROTECTION

1. Dedicated standalone app owns its source, project and deployment; **BUKLOD Main is only entry/integration**. Read `BUKLOD-Rork/docs/BUKLOD_APP_BOUNDARIES.md` and `.buklod/app-boundaries.json`; do not overwrite Main or use its Expo project/OTA/production URL.
2. Current `BUKLOD-Classroom` source is a **Vite web candidate**. Do not falsely label it the restored original Expo Android app. Inspect existing native Classroom components and proven Expo project assets before planning native parity.
3. The historical Classroom Expo project ID `14100ed1-7f25-4551-9627-09d280498241`, web URL `https://buklod-classroom.expo.app`, and artifact `0g49qf2xe0` are **leads, not current ownership proof**. Verify with Expo/EAS permissions before registration and release.
4. Main/Quiz/Faculty/Attendance/Grade Viewer must share one authoritative BUKLOD identity and compatible academic records, not conflicting sources of truth. The existing Supabase project identified in reconciliation is `yhanxndaqbmuzbdqlblu`; verify environment and data ownership before any modification. Do not duplicate production DBs as a shortcut.
5. Preserve Gemini cyan/green branding, responsive layout, ten dashboard tiles, drawer/long-press UX, grouped `CLASS / WORK / CONNECT / MORE`, and working interactions. Improve only with functional and accessibility evidence, never replace accepted design needlessly.
6. No secrets, real student personal data, recovery archives or service-role credentials in the PUBLIC repository, issue, logs, client or test artifacts. Browser uses publishable Supabase key only; privileged writes via authenticated, authorization-checked server RPC/Edge functions.
7. Preserve production Main compatibility, existing old Classroom routes and PR #518 unchanged until controlled parity review. Avoid stale-branch merges; cherry-pick reviewed and necessary changes only. Run new migrations exactly once with rollback/reconciliation.
8. No owner-local-file writes, AppDeploy generation credits, unnecessary EAS/native builds, repeated CI, speculative deploys, or paid toolchain substitutions. Batch code changes and run risk-based tests. Avoid exposing ad revenue formulas in user UI; no interruptive ads during examinations, academic record mutations, attendance checks, or live instruction.

## AUTHORITATIVE EVIDENCE AND GAP MATRIX

Before editing, inspect the working repository and these sources:
- `docs/MASTER_BLUEPRINT_RECONCILIATION_2026-11-10.md`
- `docs/LIVE_E2E_AUDIT_2026-11-09.md`
- `docs/UPSTREAM_CLASSROOM_WEB_README.md`
- `docs/RELEASE_BLOCKERS.md`
- Main `BUKLOD-Rork` current production head, DEV branches `dev/classroom-completion-20261110`, `dev/classroom-main-sso-20261110`, existing academic Supabase functions/migrations, and draft PR #518.
- Check any newer authoritative changes made after this mandate before implementing.

Create a living per-feature acceptance ledger: **implemented backend / implemented frontend / authenticated E2E / performance / release**, with explicit NOT DONE for unproven actions. Do not count table/RPC existence or synthetic-browser tests as successful user E2E.

## COMPLETE FUNCTIONAL WORKSTREAMS

### A. Access, profiles, roles and security
- Single BUKLOD account; secure Main -> Classroom one-time handoff, never access/refresh tokens in URL query; token expiry, single-use/replay defense, exact user UUID verification and forced revalidation of role/enrollment on entry.
- Role-specific Faculty, Student and dual-role views; role switch without login loop and without leaking cached privileged data. Faculty owner, assigned faculty, co-teacher, assistant, student, registrar/adviser/admin permissions with least privilege.
- Enforce class scope, organization scope, active enrollment, revoked/suspended accounts and other-class isolation at RPC, RLS and storage layers, not just hidden buttons.
- Auth expiry, logout across tabs, permission changes, denied states, safe error feedback, session recovery, no endless loading.
- BUKLOD Main has only stable doorway/deep links; existing usable Main-side academic functions remain until parity verified.

### B. Student and Faculty dashboards
- Responsive dashboard: My Classrooms, Active Classes, To Do, Upcoming, Notifications, Attendance, Grades, Progress, Live Now, Continue.
- Real multi-class aggregates; accurate overdue/due dates; class/course/year/semester/subject/section folders, persistent last opened class.
- One-tap responsive navigation and Back; functional menu/drawer and close on tap-outside; no dead tiles, stale state, blank screens or duplicate fetching.
- Show appropriate class notifications and sensitive information only to authorized role; released-only grades for students.

### C. Class lifecycle, roster and official identity
- Create/edit/assign classes for Lecture, Lab, RLE, Clinical Duty, OJT, Practicum, Thesis, Capstone and Mixed; AY/semester/subject/section/schedule/capacity/cutoff and ownership.
- Lifecycle Create -> Configure -> Activate -> Enrollment -> Close -> Archive/Restore; guarded permanent delete only of truly empty classes, with exact-name confirmation, independent backend checks, row-lock and audit. Never delete classes with academic history.
- Official student ID linked to verified BUKLOD identity; many-to-many students/classes; roster creation and authorized corrections; enrollment statuses Pending/Active/Rejected/Withdrawn/Dropped/Completed/Archived.
- **Eight-step verified import** for XLSX/XLS/CSV/DOCX/PDF: upload -> parse -> preview -> ID/name matching -> detect duplicate/conflicts/unmatched -> faculty review -> explicit confirm -> auditable commit. No auto-enrollment on parser confidence alone; reconcile legacy Edge behavior if it violates review-first.
- Provide faculty/student registration or linking that survives historical semesters and section changes; no accidental cross-class records.

### D. Class, learning materials and syllabus
- Announcements, pinned posts, comments/replies, reactions, attachments, moderation and visibility. Scope posts/comments to same classroom and current membership.
- Faculty-managed syllabus, learning outcomes, week/module/lesson progression, prereqs, drafts/version/review/publish/release. AI assistance may suggest only, faculty owns official release.
- Upload/download/view authenticated PDF/DOC/DOCX/XLS/XLSX/PPT/PPTX/CSV/photo/video files with progress, size/MIME restrictions, signed URLs, retry/reconnect, cleanup and permission enforcement. Cached/offline reading where allowed.
- Consistent navigation, document preview, edit/delete controls, and feedback for successful or failed write.

### E. Work, submissions, Quiz and QuickCheck
- Faculty activity creation: rubric, category, term, deadline, groups/individual work, allowed media, late/make-up rules, feedback, return-for-revision and scoring.
- Student submissions: text/link/file/photo/video, save draft, pending upload, submitted, late, review, returned, graded, released; idempotent retry and audit, no duplicate submissions or false saved statuses.
- BUKLOD Quiz is the authoritative secure exam engine; support up to 100 concurrent participants per agreed constraints, per-student shuffle, timed integrity rules, interruption/reconnect policies and auto-submit where applicable. Never invent answers or attempt state.
- Official attempt -> student/class/assessment identity -> score -> faculty review -> configurable term gradebook category -> release. No duplicate scoring, overwrite, or second exam database truth. Reconcile main Supabase cutover before claiming single database complete.
- QuickCheck class launch, safe identity/participation mapping and optional explicitly authorized grade integration; prevent unauthorized automatic grade edits.
- Real rationale/feedback where applicable, attempt status, saved answers parity, missing-answer protections, secured answer keys.

### F. Attendance and academic integrity
- Faculty attendance session open/close; manual, QR, face/biometric where available and lawful/consented, live-session event check-in; verified logs, late/cutoff policies, duplicates and corrections.
- Configurable **per-class** 08:00 cutoff when explicitly chosen; do not impose teaching-specific historic class rules globally. Reflect verified attendance into official participation/attendance grades only under selected policy.
- Offline check-in may be provisional only; authoritative server validates when connected. Audit edits/excuses/no-shows and protect students from network-related false absence.

### G. Gradebook, Grade Viewer and academic release
- Term lifecycle Prelim, Midterm, Semifinals, Finals; faculty editor for categories/weights summing to 100%; support generic template AND independent 40-40-20 or other teacher-specific schemes, not forced globally.
- Raw scores, zero vs missing vs excused vs not encoded, INC/withdraw/drop, requirements, participation and attendance, make-up assessments; teacher-controlled calculations and ceilings (e.g., 93 only where expressly set per class).
- Configurable passing thresholds and transmutation, round/edge case rules and Philippine equivalents. Grade provenance from each activity, Quiz and attendance event. No unchecked silent overwrite.
- Draft -> Review -> Term Release -> Compute Final -> Final Release -> Lock. Student sees only own released grade; faculty can correct with reason, permissions, immutable audit history.
- **Grade Viewer**: secure Excel import/diff preview, detect mismatched IDs/sections, duplicates and missing students, explicit confirm, exports; same canonical student and assessment ledger, no separate untrusted official grade truth.
- Faculty dashboards, official PDF/CSV/Excel exports, audit and cross-term reconciliation. Protect against simultaneous writers.

### H. RLE/OJT, clinical and portfolios
- Clinical/rotation groups, instructors, assignments, duty dates, times, late/absent and makeup hours, validated cumulative hours, approval chain.
- Clinical competency/skills checklist, return demonstration, evaluation rubrics, instructor verification/sign-off; individualized progress and assessments.
- Journal/portfolio draft, text/photo/file entry, faculty review and feedback, reflective submissions, longitudinal history.
- Support irregular students, multiple schedules/groups, scoped faculty access. Approved duty/clinical records map into gradebook without silently inflating scores.

### I. Live teaching / CONNECT
- Real authorized web Live Classroom join/start/leave/end using supported Stream/RTC provider, checking existing native Stream implementation before any browser adaptation; per-class provider room identity and backend session authority.
- Target **60 students / 120 minutes** subject to provider capacity and verified quotas. Mode controls: Lecture, Reporting, Recitation, Discussion, Focus, Gallery Check and Presentation.
- Functional faculty toolbar: Start, Mute All, Random/Next recitation, Attention, Reporting, Grade, Attendance, Quiz, Screen Share, Breakout, End. Permissions and acknowledgments validated on server.
- Student camera/mic default OFF; explicit consent, immediate mute/off controls; network-aware 25% normal active cameras, 50% temporary burst under documented capacity policy, with accessible fallback.
- Recitation 0–5 score with source/timestamp/idempotency, review/undo and audit. Attention evidence must never automatically penalize weak-network/disabled-camera students; faculty review required.
- Reconnect/3G degradation, background/mobile behavior, timeout cleanup, fair attendance reconciliation and no double counting. Test real audio/video and screen-share, not a mocked live label.
- Class discussions, scoped chat, direct messages/consultation, attachments, unread counts, push/deep links; real-time visibility and server-side moderation.

### J. Formal notices and student support
- Official notice creation targeting correct student/class/group; warning, intervention, commendation, attendance, requirements, academic action. Authenticated read receipt and student acknowledgement, no mass-target data leak.
- Advising/concern follow-up, authorized case notes, privacy and lifecycle; student can respond where permitted.
- Class representatives/officers may coordinate authorized class tasks but cannot change official grades.

### K. Offline, performance, device and usability
- Cache syllabus, materials, lesson reading and released-only data for offline use with bounded TTL and source-version validation; queue eligible drafts/uploads with explicit Pending/Syncing/Synced/Error states and idempotency.
- Online-only authoritative transactions for exams, grade release, enrollment confirmation and verified attendance. Never fake success offline.
- Weak-network behavior, bounded retries/backoff, stale cache handling, cancellation, optimistic UI only where safe, responsive first tap, preserve scroll/navigation state, no perpetual spinner.
- Responsive mobile and desktop UX, Philippine language support as appropriate, safe font scaling, accessibility, proper back navigation, no overwhelming margins. Test Infinix X6852 Android where relevant and a representative desktop browser.
- Secure native document/camera pickers and Android functions only if actual standalone native source is verified/recovered; no forced native build to solve a web-only issue.

### L. Administration, analytics, monetization and operational readiness
- Analytics for faculty workload, participation, attendance, deadlines, teaching hours, grade completion; reports and audit exports scoped per role.
- School/admin/registrar oversight only with verified entitlements; no cross-institution student data leaks.
- Advertising placements only in permitted non-critical areas, respecting privacy and school use. Never gate a time-limited quiz, official submission, grade view/release, attendance verification or live class behind ad watching or interstitials.
- Backups/export, rollback procedures, storage quotas, reconciliation telemetry, error logs without confidential payloads, and support escalation.
- Do not invent subscriptions/pricing; historical tier proposals are not billing authorization.

## EXECUTION STRATEGY — MINIMIZE COST, FINISH ALL WORK

**Phase 0 — reconcile:** Inspect latest Main/DEV/this repo, backend schemas/RLS/Edge, Gemini functionality, archived native source and all approved design/functional requirements. Record single source of truth, blockers and test matrix. Do not reimplement verified working modules.

**Phase 1 — secure academic core:** Identity/handoff, role boundaries, class CRUD, roster import/approval, enrollment, content/files/submissions, proper statuses, notifications. Ship one coordinated DEV batch with focused tests.

**Phase 2 — assessments and records:** Quiz/QuickCheck integration, attendance, gradebook, release/lock, Excel grade viewer, RLE/OJT/journals and official audit. Test realistic mixed-role transactions and duplication/race cases.

**Phase 3 — live/experience:** Real live classroom, recitation and communications; offline/reconnect, devices, accessibility, performance and privacy. Use provider only after current account access and quota verification.

**Phase 4 — final release:** End-to-end actual isolated Faculty/Student/Dual/Admin fixtures; complete course-day and full term lifecycle; negative authorization tests, cross-class isolation, concurrent write/idempotency, offline/reconnect/device; freeze exact RC and verify immutable artifact/hosting. Separate Main doorway release only after its own gates, then deploy standalone to registered verified project. Confirm production HTML/JS artifact ID, authenticated real transactions, rollback.

Parallelize independent coding and tests, but coordinate all schema changes and defer dependent releases. Use only existing authorized resources. Avoid repetitive full builds, unnecessary workflow runs and paid AppDeploy.

## REQUIRED VERIFICATION MATRIX

- Teacher A cannot read/edit Teacher B classroom; student A cannot read student B drafts/grades; student grade only appears after release.
- Expired/replayed SSO does not grant access; role revocation clears sensitive client state.
- Import duplicates/conflicts never silently enroll; concurrent imports/submissions/grade writes are idempotent.
- Class with submissions/grades cannot be permanently deleted.
- Failed upload/reconnect never falsely reports saved/graded; draft recovery and retry work.
- Quiz attempt is recorded once and mapped to the correct grade/category; no mismatched student or invented score.
- Attendance corrections, justified absence, late cutoff and grade reflection preserve provenance.
- Excel import mismatches require confirmation; no bulk silent grade overwrite.
- Grading weights reject invalid totals; release and lock enforce permission and proper audit.
- Real meeting: permission, join/start/end, media, mute/camera opt-in, screen share, 3G reconnect, clean exit, accurate attendance.
- All dashboard buttons, document previews, class transitions, mobile back and offline errors show functional outcomes.
- Verify web and native applicability separately; make no claims unsupported by artifacts or real transactions.

## OPERATIONAL RULES / FINAL REPORT

- Do not delete local backups or encrypted recovery vaults; do not expose them publicly.
- Do not create another new app, new database, or migrate production data without proven necessity and reconciliation.
- Keep code isolated in dedicated `BUKLOD-Classroom` repo. Changes to Main, Quiz, Faculty, Attendance, QuickCheck, Grade Viewer or Supabase require narrowly scoped independent review/permission and separate verification.
- Work continuously within available tools until every safe implementation and test is exhausted; **do not stop at a plan, scaffolding, one commit, or a green build**.
- If production deployment target/Expo access or isolated real-role fixtures are unavailable, finish all independent DEV work and state only remaining gates; no dangerous shortcuts.
- Completion must be: **VERIFIED COMPLETE**, **PARTIALLY COMPLETE WITH EXPLICIT BLOCKERS**, or **BLOCKED BEFORE RELEASE**. Report repo, branch, exact commit, modules really implemented, focused tests, real E2E, CI/build credits spent, verified RC, production identity/artifact and URLs, unresolved gaps.

**Owner acceptance:** fully operational Classroom before the next school opening, preserving Gemini layout AND button behavior, with no fabricated completeness or extra owner-local files.
