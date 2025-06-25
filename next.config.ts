import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

// Pass the path to your i18n configuration file
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  // ggf. weitere Next-Konfiguration
};

export default withNextIntl(nextConfig);