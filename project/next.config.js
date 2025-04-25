const withNextIntl = require('next-intl/plugin')('./i18n/config.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com'],
  },
};

module.exports = withNextIntl(nextConfig);
