import Document, { Head, Html, Main, NextScript } from "next/document";

export default class _Document extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta
            httpEquiv="Content-Security-Policy"
            content="upgrade-insecure-requests"
          />
          <script defer src="https://developers.kakao.com/sdk/js/kakao.js" />
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
