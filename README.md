# kf-portfolio

![SBOM Security Scan](https://github.com/federerkristijan/kf-portfolio/actions/workflows/sbom.yml/badge.svg)

Personal portfolio website built with Next.js 16, deployed on Vercel, backed by Supabase.

## Security

This repository runs an automated SBOM security pipeline on every push and pull request to `main`.

| Tool | Purpose |
|---|---|
| [syft](https://github.com/anchore/syft) | Generates a Software Bill of Materials (CycloneDX JSON) |
| [grype](https://github.com/anchore/grype) | Scans the SBOM for known vulnerabilities — fails on HIGH and above |
| [grant](https://github.com/anchore/grant) | License compliance report |
| [trufflehog](https://github.com/trufflesecurity/trufflehog) | Secret detection across the repository |

Reports are uploaded as workflow artifacts on every run.

## Getting Started

```bash
npm run dev
```

Secrets are managed via [Infisical](https://infisical.com) and injected at runtime.
The Infisical environment must provide:

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Postgres connection string |
| `DATASE_CA_CERT` | Supabase CA certificate (PEM), used to verify the DB's TLS certificate |
| `NODEMAILER_AUTH_USER`, `NODEMAILER_AUTH_PASS` | SMTP credentials for the contact form |
| `BLOCKED_EMAIL_DOMAINS` | Optional, comma-separated extra domains the contact form rejects |

Infisical only injects secrets at startup, so restart `npm run dev` after changing one.

## Database migrations

Migrations in `src/db/migrations/` are plain SQL, applied by hand in order:

```bash
infisical run --env=dev -- sh -c 'psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f src/db/migrations/<file>.sql'
```

## Tests

End-to-end tests run against the already running dev server on `localhost:3000`:

```bash
npm run test:e2e
```

## Stack

- **Framework:** Next.js 16 (App Router), React 19
- **Database:** Supabase (PostgreSQL)
- **Deployment:** Vercel
- **Secrets:** Infisical
