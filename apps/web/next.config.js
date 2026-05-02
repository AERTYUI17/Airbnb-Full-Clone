/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')('./src/i18n.ts');

const nextConfig = {
  reactCompiler: true,
  turbopack: {
    root: '../../',
  },
};

module.exports = withNextIntl(nextConfig);
