import "../styles/sakura.css";
import "../styles/Countdown.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import Sakura from "../lib/sakura";
import { useEffect, useState } from "react";
import GlobalStyles from "../styles/GlobalStyles";
import dotenv from "dotenv";
import { QueryClient, QueryClientProvider } from "react-query";
import { DefaultSeo } from "next-seo";
require("dotenv").config();

const client = new QueryClient();

const DEFAULT_SEO = {
  title:
      `${process.env.NEXT_PUBLIC_GROOM_NAME}` +
      " ❤️ " +
      `${process.env.NEXT_PUBLIC_BRIDE_NAME}` +
      " 우리 결혼합니다!",
  description: "24년 02월 24일 (토) 오후 1시 \n채림웨딩홀 6층 컨벤션홀",
  canonical: "https://wedding-invitation.chang-ju.shin-hee.com",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://wedding-invitation.chang-ju.shin-hee.com",
    title:
        `${process.env.NEXT_PUBLIC_GROOM_NAME}` +
        " ❤️ " +
        `${process.env.NEXT_PUBLIC_BRIDE_NAME}` +
        " 우리 결혼합니다!",
    // site_name: "test site",
    images: [
      {
        url: "https://wedding-invitation.chang-ju.shin-hee.com/pictures/1.jpg",
        // width: 285,
        // height: 167,
        alt: "img",
      },
    ],
  },
  twitter: {
    handle: "@handle",
    site: "@site",
    cardType: "summary_large_image",
  },
};

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(true);

  // mount loading
  useEffect(() => {
    setLoading(false);
  }, []);
  //flower
  useEffect(() => {
    if (typeof window !== "undefined" && !loading) {
      new Sakura("main");
    }
  }, [loading]);

  // Kakao share init
  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(`${process.env.NEXT_PUBLIC_KAKAO_JS_KEY}`);
    }
  }, []);

  return (
    <>
      <DefaultSeo {...DEFAULT_SEO} />
      <QueryClientProvider client={client}>
        <Head>
          <title>창솔루션❤️시니천사</title>
        </Head>

        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            spacing: 0,
            breakpoints: {
              xs: 400,
              sm: 500,
              md: 800,
              lg: 1000,
              xl: 1200,
            },
            fontFamily: "Noto Sans KR",
          }}
        >
          <GlobalStyles />

          <div
            id="main"
            style={{
              overflow: "hidden",
              position: "relative",
            }}
          >
            {loading ? <>Loading...</> : <Component {...pageProps} />}
          </div>
        </MantineProvider>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
