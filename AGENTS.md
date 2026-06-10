# Agent instructions (Cursor / AI)

This repo is **Open House Market Place** (`openhousemarketplace.com`), Next.js 15 App Router.

**Cursor:** Project rules live in [`.cursor/rules/openhousemarketplace.mdc`](.cursor/rules/openhousemarketplace.mdc) (`alwaysApply`).

Before substantive edits:

1. Read **[docs/soul.md](docs/soul.md)** — brand, Dr. Jan Duffy naming, NAP/GBP, voice.
2. Read **[docs/skill.md](docs/skill.md)** — stack, integrations, CSP, files not to touch (`components/idx/*`).
3. Use **[docs/klb-vercel-playbook.md](docs/klb-vercel-playbook.md)** for Vercel, env, and deployment patterns.
4. For **Google Search Console** and **Google Business Profile** checklists and repo map, see **[docs/gsc-gbp-runbook.md](docs/gsc-gbp-runbook.md)**.
5. For **Cloudflare edge maintenance** (503 snippet, proxied DNS), see **[docs/cloudflare-maintenance.md](docs/cloudflare-maintenance.md)**.

NAP and business facts: **`config/gbp.ts`** is the source of truth.

**Scheduling / leads:** Calendly is the primary UX; a **Follow Up Boss API key is not required** in Vercel for normal operation. Optional FUB env vars are documented in **[docs/klb-vercel-playbook.md](docs/klb-vercel-playbook.md)** and [`.env.example`](.env.example).

**Deploy:** Always target **production** (`vercel deploy --prod`), not preview. See **[docs/VERCEL_DEPLOYMENT.md](docs/VERCEL_DEPLOYMENT.md)**. Merge agent work to **`main`** when possible; Vercel Git auto-builds only `main`.
