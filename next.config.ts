import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  // ggf. weitere Next-Konfiguration
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);