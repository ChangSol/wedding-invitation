/** @type {import('next').NextConfig} */

const debug = process.env.NODE_ENV !== "production";
const repository = "https://changsol.github.io/wedding-invitation";

const nextConfig = {
  // distDir: 'build',
  // assetPrefix: '.',
  reactStrictMode: true,
  // assetPrefix: !debug ? `${repository}` : "", // production 일때 prefix 경로
  trailingSlash: true, // 빌드 시 폴더 구조 그대로 생성하도록
  swcMinify: true,
  // env: {
  //   BASE_URL: process.env.BASE_URL,
  // },
}

module.exports = nextConfig
