/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    GITHUB_PAT: process.env.GITHUB_PAT,
  },
};

module.exports = nextConfig;
