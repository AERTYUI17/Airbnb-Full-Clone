/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')('./src/i18n.ts');

const nextConfig = {
  turbopack: {
    root: '../../',
  },
};

module.exports = withNextIntl(nextConfig);
