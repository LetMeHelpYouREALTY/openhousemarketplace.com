# Vercel deployment — audit & troubleshooting

Project: **openhousemarketplace.com** (canonical: `https://www.openhousemarketplace.com`).

## Audit summary (June 2026)

| Issue | Impact | Fix |
|--------|--------|-----|
| **`outputDirectory: ".next"` in `vercel.json`** | Git builds fail finalization; pushes look like “no deploy” | **Removed** — Next.js must not set `outputDirectory` in `vercel.json`. |
| **npm vs pnpm** | Wrong install/build on Vercel | `vercel.json` uses `pnpm install --frozen-lockfile` and `pnpm run build`. |
| **Pushes only to feature branches** | Production never updates | Merge to **`main`** or enable preview deployments for all branches. |
| **GitHub repo transfer** | Webhooks still on old org/repo | Reconnect Git to **`LetMeHelpYouREALTY/openhousemarketplace.com`** (was `DrJanDuffy/...`). |
| **Wrong `VERCEL_PROJECT_ID` in Actions** | CI deployed **`drjanduffy.com`** instead of this site | Set secret to **openhousemarketplace.com** project ID (see below). |
| **Outdated Vercel CLI in CI** | `vercel deploy` failed: requires CLI **≥ 47.2.2** | Workflow uses **`vercel@latest`**. |

## Why `git push` might not deploy

| Cause | What to check |
|--------|----------------|
| **Wrong branch** | **Production** deploys from **`main`**. Pushes to `cursor/*` only deploy if **Preview Deployments** are enabled (Vercel → Project → Settings → Git). |
| **`outputDirectory` in `vercel.json`** | Must stay **absent** for Next.js ([Vercel error doc](https://github.com/vercel/vercel/blob/main/errors/now-next-routes-manifest.md)). |
| **npm vs pnpm** | Repo uses `pnpm@10`; `vercel.json` must keep pnpm commands. |
| **Git integration disconnected / wrong repo** | Vercel → **openhousemarketplace.com** → Settings → Git → connect **`LetMeHelpYouREALTY/openhousemarketplace.com`**, Production branch **`main`**. |
| **Ignored Build Step** | Settings → Git → custom command returning exit `1` skips all deploys. Leave empty unless required. |
| **GitHub Actions secrets wrong** | Workflow validates project name; see [`.github/workflows/vercel-deploy.yml`](../.github/workflows/vercel-deploy.yml). |

## GitHub Actions secrets (backup deploy)

Repository → **Settings → Secrets and variables → Actions**:

| Secret | Value |
|--------|--------|
| `VERCEL_TOKEN` | [Vercel account token](https://vercel.com/account/tokens) |
| `VERCEL_ORG_ID` | `team_EIbjFXaDDtGMTweb5Hvo3CG3` (Janet Duffy's projects) — confirm in team settings |
| `VERCEL_PROJECT_ID` | **openhousemarketplace.com** only — from Vercel → Project → Settings → General → **Project ID** |

**Do not** reuse the **drjanduffy.com** project ID (`prj_xZmrAjHZjKncFudRykf1hDaLVvtB`). A mis-set secret caused CI to upload this repo to the wrong Vercel project.

After updating secrets, push to `main` or run **Actions → Vercel Deploy → Run workflow**.

Local link (optional):

```bash
vercel link   # choose team + openhousemarketplace.com
cat .vercel/project.json   # copy projectId into VERCEL_PROJECT_ID
```

See [`docs/vercel-project.json.example`](./vercel-project.json.example).

## Deploy paths (pick one or use both)

### A. Vercel Git integration (preferred)

1. Push to **`main`** → production deployment.
2. Confirm **Production Branch** = `main`.
3. After `vercel.json` fix, open **Deployments** and confirm a new build starts (not stuck on old failed finalization).

### B. GitHub Actions (backup)

Every push to `main` or `cursor/**` runs `vercel deploy` (remote build) when secrets are set and project validation passes.

### C. Manual CLI

```bash
pnpm install
vercel link
vercel pull --yes --environment=production
vercel deploy --prod --yes
```

## Maps API keys

Do **not** commit Google Maps keys in `vercel.json`. Set `GOOGLE_MAPS_API_KEY` and `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` in the Vercel project **Environment Variables** UI ([VERCEL_SETUP.md](./VERCEL_SETUP.md)).

## Verify production

```bash
curl -sI https://www.openhousemarketplace.com/ | head -5
curl -sI https://www.openhousemarketplace.com/sitemap.xml | head -5
```

## Related

- [klb-vercel-playbook.md](./klb-vercel-playbook.md)
- [VERCEL_SETUP.md](./VERCEL_SETUP.md)
