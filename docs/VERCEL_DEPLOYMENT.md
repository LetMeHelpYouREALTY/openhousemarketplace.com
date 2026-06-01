# Vercel deployment — audit & troubleshooting

Project: **openhousemarketplace.com** (Vercel project name typically `openhousemarketplace.com`).

## Why `git push` might not deploy

| Cause | What we did / what you should check |
|--------|-------------------------------------|
| **Wrong branch** | **Production** deploys from **`main`**. Pushes to `cursor/*` only deploy if **Preview Deployments** are enabled in Vercel → Project → Settings → Git. |
| **`outputDirectory` in `vercel.json`** | Removed. For Next.js, Vercel must **not** set `outputDirectory: ".next"` — it breaks Git finalization ([Vercel docs](https://github.com/vercel/vercel/blob/main/errors/now-next-routes-manifest.md)). |
| **npm vs pnpm** | Repo uses `pnpm@10` (`package.json` `packageManager`). `vercel.json` now uses `pnpm install --frozen-lockfile` and `pnpm run build`. |
| **Git integration disconnected** | Vercel Dashboard → Project → Settings → Git → reconnect `LetMeHelpYouREALTY/openhousemarketplace.com`. |
| **Ignored Build Step** | Settings → Git → if a custom command returns exit `1`, deploys are skipped. Leave empty unless you need it. |
| **No GitHub Actions secrets** | Workflow [`.github/workflows/vercel-deploy.yml`](../.github/workflows/vercel-deploy.yml) runs only when `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` are set. |

## Deploy paths (pick one or use both)

### A. Vercel Git integration (default)

1. Push to **`main`** → Production deployment.
2. Push to other branches → Preview (if enabled for all branches).
3. Confirm **Production Branch** = `main` in project Git settings.

### B. GitHub Actions (backup)

Add repository secrets (Settings → Secrets and variables → Actions):

| Secret | Where to get it |
|--------|------------------|
| `VERCEL_TOKEN` | Vercel → Account Settings → Tokens |
| `VERCEL_ORG_ID` | Team settings URL or `.vercel/project.json` after `vercel link` |
| `VERCEL_PROJECT_ID` | Same as above (`projectId`) |

Every push to `main` or `cursor/**` runs build + `vercel deploy --prebuilt`.

### C. Manual CLI

```bash
pnpm install
vercel link   # once, links openhousemarketplace.com
vercel pull --yes --environment=production
vercel build --prod
vercel deploy --prebuilt --prod
```

## After changing `vercel.json`

1. Commit and push to the branch Vercel watches (usually `main` for production).
2. In Vercel → Deployments, confirm a new build starts (not stuck on an old failed finalization).
3. If Git integration still fails, rely on the GitHub Actions workflow or CLI prebuilt deploy.

## Maps API keys

Do **not** commit live Google Maps keys in `vercel.json`. Set `GOOGLE_MAPS_API_KEY` and `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` in the Vercel project Environment Variables UI (see [VERCEL_SETUP.md](./VERCEL_SETUP.md)).

## Related

- [klb-vercel-playbook.md](./klb-vercel-playbook.md)
- [VERCEL_SETUP.md](./VERCEL_SETUP.md)
