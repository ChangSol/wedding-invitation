/** @type {import('next').NextConfig} */

const debug = process.env.NODE_ENV !== "production";
const repository = "";

const nextConfig = {
  // distDir: 'build',
  // assetPrefix: '.',
  // basePath: !debug ? `${repository}` : "", // production 일때 prefix 경로
  output: "export", // next build 시 out/ 에 정적 파일 생성 (구 next export)
  reactStrictMode: false,
  assetPrefix: !debug ? `${repository}` : "", // production 일때 prefix 경로
  trailingSlash: true, // 빌드 시 폴더 구조 그대로 생성하도록
  images: {
    unoptimized: true, // 정적 export 라 이미지 최적화 서버 없음. 원본 경로 그대로 사용
    formats: ["image/avif", "image/webp"],
  },
  // env: {
  //   BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  // },
};

module.exports = nextConfig;
