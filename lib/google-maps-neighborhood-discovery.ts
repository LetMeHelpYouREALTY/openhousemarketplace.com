/**
 * Google Maps Platform Neighborhood Discovery (hosted HTML on Cloud Storage).
 * Requires a valid Maps JavaScript API key in the hosted solution — often breaks on production.
 * Prefer GoogleMyMapsEmbed / getGoogleMapsServiceAreaEmbedUrl() for site maps (no API key).
 */
export const DEFAULT_GOOGLE_MAPS_NEIGHBORHOOD_DISCOVERY_EMBED_URL =
  'https://storage.googleapis.com/maps-solutions-v9iuebxrqf/neighborhood-discovery/6imu/neighborhood-discovery.html'

export function getGoogleMapsNeighborhoodDiscoveryEmbedUrl(): string {
  const raw = process.env.NEXT_PUBLIC_GOOGLE_MAPS_NEIGHBORHOOD_DISCOVERY_EMBED_URL
  if (typeof raw === 'string' && raw.trim() !== '') {
    return raw.trim()
  }
  return DEFAULT_GOOGLE_MAPS_NEIGHBORHOOD_DISCOVERY_EMBED_URL
}
