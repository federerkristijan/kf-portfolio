# Project instructions

## Command execution — hard boundary (no exceptions)
* You are NEVER allowed to run any command without my explicit permission. Not a single one.
* This applies to EVERY command without exception — including read-only ones (e.g. ls, cat, git status). There are no "safe" exceptions.
* Before running anything in the shell, you MUST ask me and wait for my explicit approval for that specific command. Do not batch, assume, or infer permission from earlier approvals.
* This right has been taken away from you because you ran a command without permission that exposed my Infisical secret values. That must never happen again.

## Secrets
* NEVER read or process .env files.
* NEVER run any command that prints, lists, or otherwise exposes secret values (e.g. `infisical secrets`, `printenv`, `env`).
* STOP immediately if you encounter API keys, passwords, or other credentials.
