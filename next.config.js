/** @type {import('next').NextConfig} */

const debug = process.env.NODE_ENV !== "production";
const repository = "";

const nextConfig = {
  // distDir: 'build',
  // assetPrefix: '.',
  // basePath: !debug ? `${repository}` : "", // production 일때 prefix 경로
  reactStrictMode: false,
  assetPrefix: !debug ? `${repository}` : "", // production 일때 prefix 경로
  trailingSlash: true, // 빌드 시 폴더 구조 그대로 생성하도록
  swcMinify: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // env: {
  //   BASE_URL: process.env.BASE_URL,
  // },
};

module.exports = nextConfig;
