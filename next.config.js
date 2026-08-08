/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require("next-intl/plugin");


const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "r2.dev" },
    ],
  },
};

module.exports = nextConfig;
