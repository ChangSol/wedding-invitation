import "../styles/sakura.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import Sakura from "../lib/sakura";
import { useEffect, useState } from "react";
import GlobalStyles from "../styles/GlobalStyles";
import dotenv from "dotenv";
import { QueryClient, QueryClientProvider } from "react-query";
require("dotenv").config();

const client = new QueryClient();

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
    <QueryClientProvider client={client}>
      <Head>
        <title>창솔루션❤️시니천사</title>
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
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
  );
}

export default MyApp;
