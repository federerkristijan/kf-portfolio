# kf-portfolio

![SBOM Security Scan](https://github.com/federerkristijan/kf-portfolio/actions/workflows/sbom.yml/badge.svg)

Personal portfolio website built with Next.js 15, deployed on Vercel, backed by Supabase.

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

## Stack

- **Framework:** Next.js 15 (App Router)
- **Database:** Supabase (PostgreSQL)
- **Deployment:** Vercel
- **Secrets:** Infisical
