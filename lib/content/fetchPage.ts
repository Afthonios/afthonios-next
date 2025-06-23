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
    const pageKey = slugMap[locale]?.[slug];
    if (!pageKey) throw new Error(`Page not found: ${slug} (${locale})`);
  
    // deep + fields => volle Objekte, gleichzeitig nach Sprache filtern
    const data = await directus.request(
      readSingleton(pageKey, {
        params: {
          fields: [
            '*',
            { translations: ['*'] },   // alle Felder der Relation
          ],
          deep: {
            translations: {
              _filter: { languages_code: { _eq: locale } },
            },
          },
        },
      }),
    );
  
    // Nach dem deep-Filter ist garantiert genau 1 Translation im Array
    const t = data.translations?.[0];
  
    return { key: pageKey, data, t };
  }