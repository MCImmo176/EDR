const withNextIntl = require('next-intl/plugin')('./i18n/request.ts');

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
  i18n: {
    locales: ['fr', 'en', 'el', 'ru', 'it'],
    defaultLocale: 'fr',
    localeDetection: false
  }
};

module.exports = withNextIntl(nextConfig);
