import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable static generation to fix next-intl dynamic rendering
  output: 'standalone',
  
  experimental: {
    // Enable server components
    serverComponentsExternalPackages: [],
    typedRoutes: true,
  },
  
  // Force dynamic rendering
  dynamic: 'force-dynamic',
  
  // Suppress hydration warnings
  reactStrictMode: false,
  
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
