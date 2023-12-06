/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: "build",
  images: {
    domains: ["nextbn.ggvc.com", "storage.googleapis.com"],
    minimumCacheTTL: 60,
    deviceSizes: [375, 480, 576, 768, 992, 1200],
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
