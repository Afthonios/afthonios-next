import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

export default getRequestConfig(async ({locale}) => {
  // Hier lädst du ggf. JSON-Messages pro Sprache
  const messages = (await import(`../../messages/${locale}.json`)).default;
  return {
    messages,
    routing
  };
});