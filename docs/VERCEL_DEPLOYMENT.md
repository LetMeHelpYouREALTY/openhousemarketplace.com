# Vercel deployment — audit & troubleshooting

Project: **openhousemarketplace.com** (canonical: `https://www.openhousemarketplace.com`).

**Vercel project ID (June 2026 audit):** `prj_UH4vlCl7EkB4ipEIvu7kflQN3p2E`  
**Team ID:** `team_EIbjFXaDDtGMTweb5Hvo3CG3` (Janet Duffy's projects)  
**Wrong ID in GitHub Actions (do not use):** `prj_xZmrAjHZjKncFudRykf1hDaLVvtB` → **drjanduffy.com**

---

## Audit findings (why `git push` did not deploy)

| Finding | Evidence | Fix |
|--------|----------|-----|
| **GitHub repo moved; Vercel Git still on old org** | Last Vercel **production** deploy from **`DrJanDuffy/openhousemarketplace.com`** (`githubOrg: DrJanDuffy`). Pushes today go to **`LetMeHelpYouREALTY/openhousemarketplace.com`**. No production deploy for commits after `000fef2`. | Vercel → [openhousemarketplace.com](https://vercel.com) → **Settings → Git** → connect **`LetMeHelpYouREALTY/openhousemarketplace.com`**, production branch **`main`**. |
| **GitHub Actions backup deploy blocked** | Workflow **runs** on every `main` push but **fails** at “Validate linked Vercel project”: `VERCEL_PROJECT_ID` → **drjanduffy.com**. | GitHub → repo → **Settings → Secrets → Actions** → set `VERCEL_PROJECT_ID` = **`prj_UH4vlCl7EkB4ipEIvu7kflQN3p2E`**. |
| **Production is stale** | Live production SHA ≈ `000fef2` (Mar 2026). `main` is at `e5c579c+` (SEO/indexing fixes) — not on production. | After fixes above, push empty commit or **Actions → Vercel Deploy → Run workflow**. |
| **`vercel.json` (fixed in repo)** | Removed invalid `outputDirectory`; pnpm install/build. | Already on `main` — takes effect on next successful deploy. |

### What is working

- **`git push origin main`** reaches GitHub (`LetMeHelpYouREALTY/openhousemarketplace.com`).
- **GitHub Actions** workflow triggers (see Actions → “Vercel Deploy”).
- **Vercel project** `openhousemarketplace.com` exists and domains include `www.openhousemarketplace.com`.

### What is not working

- **Vercel Git webhooks** for the **new** GitHub org (no auto-deploy on push).
- **GitHub Actions deploy step** (wrong project secret).

---

## Fix checklist (do in order)

### 1. Reconnect Vercel Git (primary — auto deploy on push)

1. Open https://vercel.com/janet-duffys-projects/openhousemarketplace.com/settings/git  
2. **Disconnect** old link if it still shows `DrJanDuffy/...`.  
3. **Connect** repository: **`LetMeHelpYouREALTY/openhousemarketplace.com`**.  
4. Set **Production Branch** = **`main`**.  
5. Clear **Ignored Build Step** unless you need it (empty = build every push).  
6. Push to `main` or click **Redeploy** on latest commit.

### 2. Fix GitHub Actions secrets (backup deploy)

Repo → **Settings → Secrets and variables → Actions**:

| Secret | Correct value |
|--------|----------------|
| `VERCEL_TOKEN` | [vercel.com/account/tokens](https://vercel.com/account/tokens) |
| `VERCEL_ORG_ID` | `team_EIbjFXaDDtGMTweb5Hvo3CG3` |
| `VERCEL_PROJECT_ID` | **`prj_UH4vlCl7EkB4ipEIvu7kflQN3p2E`** |

Then: **Actions → Vercel Deploy → Run workflow** (branch `main`) or push again.

Validation step should log: `VERCEL_PROJECT_ID resolves to Vercel project: openhousemarketplace.com`

### 3. Confirm production updated

- Vercel → **Deployments** → latest **Production** shows your commit message / SHA.  
- Or: `curl -sI https://www.openhousemarketplace.com/` → **200**.

---

## Why `git push` might not deploy (reference)

| Cause | What to check |
|--------|----------------|
| **Wrong branch** | Production = **`main`**. |
| **Wrong GitHub org on Vercel** | Must match where you push (**LetMeHelpYouREALTY**). |
| **Wrong `VERCEL_PROJECT_ID`** | Must be **openhousemarketplace.com**, not drjanduffy.com. |
| **`outputDirectory` in `vercel.json`** | Must stay **absent** for Next.js. |
| **Ignored Build Step** | Vercel Git → empty unless required. |

---

## Deploy paths

### Production only (no preview URLs)

| Mechanism | Behavior |
|-----------|----------|
| **Vercel Git** | Only **`main`** auto-builds (`vercel.json` → `git.deploymentEnabled`, `ignoreCommand` skips other branches). |
| **GitHub Actions** | Runs on `main` and `cursor/**`; always **`vercel deploy --prod`** (never preview). |

Agent branches (`cursor/*`) update production via Actions when secrets are set. Prefer merging to **`main`** so Vercel Git and Actions stay aligned.

**Vercel dashboard (verify once):** Project → **Settings → Git** → Production Branch = **`main`**. Optionally disable **Automatic Preview Deployments**.

### A. Vercel Git integration (preferred after reconnect)

Push to **`main`** → production deployment.

### B. GitHub Actions (backup)

[`.github/workflows/vercel-deploy.yml`](../.github/workflows/vercel-deploy.yml) — `vercel deploy --prod` on every triggered branch when secrets are correct.

### C. Manual CLI

```bash
pnpm install
vercel link   # team + openhousemarketplace.com
vercel deploy --prod --yes   # never omit --prod
```

---

## Maps API keys

Set `GOOGLE_MAPS_API_KEY` and `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` in the Vercel project UI ([VERCEL_SETUP.md](./VERCEL_SETUP.md)), not in `vercel.json`.

---

## Related

- [`docs/vercel-project.json.example`](./vercel-project.json.example)
- [klb-vercel-playbook.md](./klb-vercel-playbook.md)
- [VERCEL_SETUP.md](./VERCEL_SETUP.md)
