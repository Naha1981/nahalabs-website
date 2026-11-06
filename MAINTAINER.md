# Maintainer notes

Technical reference only, not customer-facing wording. Reviewed 6 November 2026. These commands are defined in the source, not newly executed in this documentation pass. Use the repository lockfile and established CI/runtime versions. No release or production migration is authorised by this file.

## Defined commands

```sh
npm run dev
npm run build
npm run lint
```

## Build and security

The build includes prerendering through `scripts/prerender.mjs`. The security suite is defined as `npm run test:security`. Do not run the package clean command casually: it removes build output and a server file. Check current routes, contact handling and published claims before release.

## Configuration and costs

Use current example environment schemas and source reads to determine required configuration. Examples contain placeholders only. Do not print credentials or replace licence/attribution files. Do not activate messages, payments, migrations or publication without the applicable approval. No unlimited free service or permanent quota is promised.
