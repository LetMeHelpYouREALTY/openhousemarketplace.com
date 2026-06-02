# Cloudflare maintenance mode — Open House Market Place

Use this when you want visitors to see a **maintenance page at the edge** (before Vercel), not only the in-app amber banner (`NEXT_PUBLIC_SITE_MAINTENANCE_MODE`).

## Important: DNS must be proxied

Cloudflare can only show a maintenance page if traffic goes **through Cloudflare** (orange cloud / **Proxied** on `A`/`CNAME` for `openhousemarketplace.com` and `www`).

This repo’s default ops note is **DNS-only (gray cloud)** with Vercel to avoid double TLS issues. Maintenance at Cloudflare **requires** turning the proxy **on** for the site hostnames while maintenance is active.

| Mode | Maintenance at Cloudflare |
|------|---------------------------|
| DNS only (gray cloud) | **No** — requests go straight to Vercel |
| Proxied (orange cloud) | **Yes** — Snippets / Workers / redirects apply |

After maintenance, you can return records to DNS-only if that is your long-term setup.

---

## Recommended: Cloudflare Snippet (503 page)

Snippet source (branded, optional crawler bypass): [`cloudflare/snippets/openhouse-maintenance.js`](../cloudflare/snippets/openhouse-maintenance.js)

### Enable in the dashboard

1. Log in to [Cloudflare](https://dash.cloudflare.com) → zone **openhousemarketplace.com**.
2. **DNS** → set `www` and apex records to **Proxied** (orange cloud) if they are DNS-only.
3. **Rules** → **Snippets** → **Create snippet**.
4. Name: `openhouse-maintenance`.
5. Paste the contents of `cloudflare/snippets/openhouse-maintenance.js`.
6. **Deploy** the snippet.
7. **Rules** → **Snippets** (or **Configuration Rules** / snippet binding, per your plan UI) → **Create rule**:
   - **When incoming requests match** (Expression Editor):

     ```
     (http.host eq "www.openhousemarketplace.com" or http.host eq "openhousemarketplace.com")
     ```

   - **Then**: run snippet `openhouse-maintenance`.
8. **Save** and **Deploy**.

### SEO during edge maintenance

In the snippet file, `BYPASS_CRAWLERS = true` (default) sends **Googlebot / Bingbot** to the origin (Vercel) so indexing can continue while humans see 503.

Set `BYPASS_CRAWLERS = false` for a full lockout (bad for SEO).

### Allow your IP (optional)

1. **Manage Account** → **Configurations** → **Lists** → create IP list `admin_ips` with your office/home IPs.
2. Use this expression instead:

   ```
   (http.host eq "www.openhousemarketplace.com" or http.host eq "openhousemarketplace.com") and (not ip.src in $admin_ips)
   ```

---

## Disable maintenance

1. **Rules** → find the snippet rule → **Disable** or **Delete**.
2. Optionally set DNS back to **DNS only** if you use gray cloud with Vercel.
3. On Vercel, remove or set `NEXT_PUBLIC_SITE_MAINTENANCE_MODE=false` if you also use the app banner.

---

## Stack with Vercel banner

| Layer | What visitors see |
|-------|-------------------|
| Cloudflare Snippet ON + proxied DNS | 503 maintenance HTML (crawlers may pass through if `BYPASS_CRAWLERS`) |
| Vercel `NEXT_PUBLIC_SITE_MAINTENANCE_MODE=true` only | Full site + amber banner (SEO unchanged) |

You can use **both**; most teams use **one** to avoid confusion.

---

## API / automation (optional)

If you have `CLOUDFLARE_API_TOKEN` (Zone:Edit) and `CLOUDFLARE_ZONE_ID`:

```bash
export CLOUDFLARE_API_TOKEN=...
export CLOUDFLARE_ZONE_ID=...
# Snippet + ruleset deployment is plan-specific; prefer dashboard unless you already automate Rulesets.
```

Cloudflare MCP in Cursor requires authentication in the IDE; use the dashboard steps above if MCP is not connected.

---

## Related

- Vercel banner: [`lib/site-maintenance.ts`](../lib/site-maintenance.ts), [`vercel.json`](../vercel.json) env `NEXT_PUBLIC_SITE_MAINTENANCE_MODE`
- DNS + GSC: [GOOGLE_SEARCH_CONSOLE.md](./GOOGLE_SEARCH_CONSOLE.md)
- Gray cloud + Vercel: [klb-vercel-playbook.md](./klb-vercel-playbook.md)
