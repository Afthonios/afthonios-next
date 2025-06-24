import { directus } from '../directus'
import { readSingleton } from '@directus/sdk'

// Maps slug + URL locale -> Directus Collection name
const slugMap: Record<string, Record<string, string>> = {
  fr: {
    'cours-de-la-semaine': 'page_freecourse',
    'test': 'page_test'
  },
  en: {
    'course-of-the-week': 'page_freecourse',
    'test': 'page_test'
  },
}

export async function fetchPageContent(slug: string, locale: string) {
  // Normalize the URL locale (e.g., 'fr', 'en') to find the correct page key.
  const localeMap: Record<string, string> = {
    'en-US': 'en',
    'fr-FR': 'fr',
    en: 'en',
    fr: 'fr',
  }
  const normalizedLocale = localeMap[locale] || locale
  const pageKey = slugMap[normalizedLocale]?.[slug]

  if (!pageKey) {
    throw new Error(`⚠️ No mapping for slug "${slug}" in locale "${locale}"`)
  }

  // --- FIX ---
  // Map the URL locale to the full locale code used in Directus (e.g., "fr" -> "fr-FR").
  // This is the critical change to make the filter work correctly.
  const directusLocaleMap: Record<string, string> = {
    en: 'en-US',
    fr: 'fr-FR',
  }
  const directusLocale = directusLocaleMap[locale] || locale;

  const data = await directus.request(
    readSingleton(pageKey, {
      fields: [
        '*',
        {
          translations: [
            'title',
            'subtitle',
            'intro_text',
            'languages_code'
          ]
        }
      ],
      deep: {
        translations: {
          // Use the mapped Directus-specific locale code in the filter.
          _filter: {
            languages_code: { _eq: directusLocale }
          }
        }
      }
    })
  )

  console.log('📦 Directus response:', {
    translations: data.translations,
    locale: `URL: ${locale}, Directus: ${directusLocale}`,
    slug,
  })

  // After the 'deep' filter, 'data.translations' should be an array with 0 or 1 item.
  const t = Array.isArray(data.translations) && data.translations.length > 0
    ? data.translations[0]
    : undefined
  
  if (!t) {
    console.warn(`[fetchPageContent] No translation found for Directus locale "${directusLocale}" in page collection "${pageKey}".`);
  }

  return { key: pageKey, data, t }
}
