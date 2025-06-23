import { directus } from '../directus';
import { readSingleton } from '@directus/sdk';

const slugMap = {
  fr: {
    'cours-de-la-semaine': 'page_freecourse',
  },
  en: {
    'course-of-the-week': 'page_freecourse',
  },
};

export async function fetchPageContent(slug: string, locale: string) {
  const pageKey = slugMap[locale as 'fr' | 'en']?.[slug];
  if (!pageKey) {
    throw new Error(`Page not found: ${slug} (${locale})`);
  }

  // Fetch the singleton entry using the Directus SDK
  const data = await directus.request(readSingleton(pageKey, {
    params: {
      fields: ['*', 'translations.*'],
    },
  }));

  return { key: pageKey, data };
}