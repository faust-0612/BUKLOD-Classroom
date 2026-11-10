# BUKLOD Classroom — Standalone Source

This repository is the dedicated source target for **APP_ID=buklod-classroom**. Source recovery is performed on an isolated DEV branch; the default branch is not a production release.

## Safety gates
- Never deploy or publish BUKLOD Classroom using BUKLOD Main's Expo project, runtime, domain, or OTA channel.
- Never commit .env files, service-role keys, credentials, student records, encrypted recovery archives, or production database exports.
- Classroom academic operations use server-authoritative permissions and released-grade visibility.
- Import verified existing Classroom source only after provenance and public-repository safety checks. Validate genuine student/faculty E2E before RC or production.
- Expo project ownership/hosting and the architecture boundary registry must be verified before deployment.

**Status:** recovery initialization; source and release target verification ongoing.
