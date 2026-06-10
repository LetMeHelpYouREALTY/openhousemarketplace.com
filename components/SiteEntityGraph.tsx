/**
 * Sitewide Schema.org @graph (Organization + RealEstateAgent + WebSite).
 * GEO: stable @id entities; AEO/E-E-A-T: licensed agent linked to GBP organization.
 */
import JsonLd from '@/components/JsonLd'
import { buildSiteEntityGraph } from '@/lib/json-ld'
import { getSiteUrl } from '@/lib/site'

export default function SiteEntityGraph() {
  return <JsonLd data={buildSiteEntityGraph(getSiteUrl())} />
}
