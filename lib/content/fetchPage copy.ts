import { directus } from '../directus'
import { readSingleton } from '@directus/sdk'

// Mappt slug + locale → Directus-Collection
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

  // --- HIER kommt das "deep" ins Spiel!
  const data = await directus.request(
    readSingleton(pageKey, {
      params: {
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
            _filter: { languages_code: { _eq: locale } }
          }
        }
      }
    })
  )

  // Optionales Debugging
  console.log('📦 Directus response:', {
    translations: data.translations,
    locale,
    slug,
  })

  // Hole die erste Übersetzung für die aktuelle Sprache
  const t = Array.isArray(data.translations) ? data.translations[0] : undefined

  return { key: pageKey, data, t }
}