/**
 * Store / office locations for the "Find our stores" map.
 * Add or edit entries to show all your locations on the website.
 */
import { GBP, OFFICE_GEO, getGoogleMapsDirectionsUrlToOffice } from '@/config/gbp'

export interface StoreLocation {
  id: string
  name: string
  address: string
  city: string
  state: string
  zip: string
  lat: number
  lng: number
  phone?: string
  /** Optional: e.g. "Mon–Fri 9am–6pm" */
  hours?: string
  /** Google Maps directions URL */
  directionsUrl: string
}

export const storeLocations: StoreLocation[] = [
  {
    id: 'summerlin-west',
    name: GBP.name,
    address: GBP.address.street,
    city: GBP.address.locality,
    state: GBP.address.region,
    zip: GBP.address.postalCode,
    lat: OFFICE_GEO.lat,
    lng: OFFICE_GEO.lng,
    phone: GBP.phone,
    hours: 'Open daily 9:00 AM–5:00 PM (matches Google Business Profile). By appointment outside hours.',
    directionsUrl: getGoogleMapsDirectionsUrlToOffice(),
  },
]
