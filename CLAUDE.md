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

## Session continuity

* At the START of a session, read `SESSION_CONTEXT.md` first — it holds the handoff context, project map, and outstanding tasks from the previous session.
* At the END of a session, when drafting the PR, update `SESSION_CONTEXT.md`: refresh the current state, what was done, and what is still outstanding, so the next session picks up cleanly.
* Never put secret values in `SESSION_CONTEXT.md`.

## Repo file sharing

* The repo is private and these files hold no secret values; this split is about hygiene, not secrets.
* `CLAUDE.md` — shared on the remote (tracked). Version-controlled project config; keep it in sync across machines via git.
* `todo.md` — shared on the remote (tracked). Worked on from two devices + the server, so it MUST stay synced via git.
* `SESSION_CONTEXT.md` — local only; gitignored, never committed. It maps infra and records operational/incident notes that should not travel with the repo.
