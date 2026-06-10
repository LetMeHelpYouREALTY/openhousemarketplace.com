import GoogleMyMapsEmbed from '@/components/GoogleMyMapsEmbed'
import GoogleMyMapsEmbedLazy from '@/components/GoogleMyMapsEmbedLazy'
import type { GoogleMapEmbedScope } from '@/lib/google-my-maps'

type GoogleMyMapsSectionProps = {
  heading: string
  description?: string
  className?: string
  id?: string
  /** When true (e.g. homepage), load map iframe after hydration to improve LCP */
  deferEmbed?: boolean
  /** service-area = Summerlin overview (default); office = Windover Ct pin */
  mapScope?: GoogleMapEmbedScope
}

/**
 * Semantic section wrapper for the shared Google Maps embed (headline + optional copy).
 */
export default function GoogleMyMapsSection({
  heading,
  description,
  className = '',
  id = 'area-map-heading',
  deferEmbed = false,
  mapScope = 'service-area',
}: GoogleMyMapsSectionProps) {
  const embed = <GoogleMyMapsEmbed mapScope={mapScope} />

  return (
    <section className={className} aria-labelledby={id}>
      <h2 id={id} className="text-2xl sm:text-3xl font-bold text-brand-plum mb-2">
        {heading}
      </h2>
      {description ? (
        <p className="text-gray-600 mb-6 max-w-3xl">{description}</p>
      ) : null}
      {deferEmbed ? <GoogleMyMapsEmbedLazy mapScope={mapScope} /> : embed}
    </section>
  )
}
