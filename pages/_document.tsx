import Document, { Head, Html, Main, NextScript } from "next/document";

export default class _Document extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script defer src="https://developers.kakao.com/sdk/js/kakao.js" />
          <meta property="og:url" content="https://github.com/changsol" />
          <meta property="og:title" content="창주❣️신희 결혼합니다" />
          <meta property="og:type" content="website" />
          <meta
            property="og:image"
            content="https://github.com/changsol/pictures/a10.jpg"
          />
          <meta
            property="og:description"
            content="24년 02월 24일 (토) 오후 1시 \n채림웨딩홀 6층 컨벤션홀"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          {/* Facebook Share Init */}
          <script
            async
            defer
            crossOrigin="anonymous"
            src="https://connect.facebook.net/ko_KR/sdk.js#xfbml=1&version=v14.0"
            nonce="Sd4w7zOx"
          ></script>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
