import type { AppProps } from "next/app";
import React, { useMemo, useState, useEffect, useCallback } from "react";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>"Demo"</title>
        <meta name="description" content="Demo" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link rel="icon" href="" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
