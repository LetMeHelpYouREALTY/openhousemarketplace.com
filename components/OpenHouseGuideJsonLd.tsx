import JsonLd from '@/components/JsonLd'
import {
  OPEN_HOUSE_GUIDE_FAQS,
  OPEN_HOUSE_GUIDE_HOWTO,
  OPEN_HOUSE_GUIDE_SPEAKABLE,
} from '@/config/seo'
import { BASE_URL } from '@/lib/metadata-utils'
import { buildFaqPageJsonLd, buildHowToJsonLd, buildSpeakableWebPageJsonLd } from '@/lib/json-ld'

const GUIDE_URL = `${BASE_URL}/open-house-guide`

export default function OpenHouseGuideJsonLd() {
  const faq = buildFaqPageJsonLd(OPEN_HOUSE_GUIDE_FAQS)
  const howTo = buildHowToJsonLd({
    name: OPEN_HOUSE_GUIDE_HOWTO.name,
    description: OPEN_HOUSE_GUIDE_HOWTO.description,
    url: GUIDE_URL,
    steps: OPEN_HOUSE_GUIDE_HOWTO.steps.map((step) => ({
      name: step.name,
      text: step.text,
      ...('url' in step && step.url ? { url: `${BASE_URL}${step.url}` } : {}),
    })),
  })
  const speakable = buildSpeakableWebPageJsonLd({
    url: GUIDE_URL,
    name: OPEN_HOUSE_GUIDE_SPEAKABLE.name,
    description: OPEN_HOUSE_GUIDE_SPEAKABLE.description,
    cssSelectors: OPEN_HOUSE_GUIDE_SPEAKABLE.cssSelectors,
  })

  return (
    <>
      <JsonLd data={faq} />
      <JsonLd data={howTo} />
      <JsonLd data={speakable} />
    </>
  )
}
