import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  images: {
    domains: ['localhost'],
  },
  trailingSlash: false,
  // Disable static optimization for dynamic rendering
  generateBuildId: async () => {
    return 'fmcb-build'
  },
};

export default withNextIntl(nextConfig);
