import type { AppProps } from "next/app";
import React, { useMemo, useState, useEffect, useCallback } from "react";
import { RuntimeConfiguration } from "../configuration";
import { makeTheme, createStyles } from "../theme";
import { ContentObject, WalletData } from "@/interface";
import { GlobalStyles, GlobalStylesProps } from "@mui/material";
import Head from "next/head";
import Script from "next/script";
import { ClaimManagementProvider } from "@mojito-inc/claim-management";
import ContentContext from "../provider";
import { WalletContext } from "../provider/WalletContext";
import "../theme/fonts.css";
import { StorageService } from "@/services";
import AuthenticationProvider from "@/provider/AuthenticationProvider";

export default function App({ Component, pageProps }: AppProps) {
  const [content, setContent] = useState<ContentObject>({} as ContentObject);
  const [wallet, setWallet] = useState<WalletData>({} as WalletData);

  const theme = useMemo(() => {
    if (content?.theme) return makeTheme(content?.theme);
  }, [content]);

  const styles = useMemo(() => {
    if (!content.theme) {
      return {};
    }
    return createStyles(content.theme) as GlobalStylesProps["styles"];
  }, [content]);

  const [token, setToken] = useState<string>(
    StorageService.token.getValue() ?? ""
  );
  const clientOptions = useMemo(
    () => ({
      uri: RuntimeConfiguration?.API_HOST_URL,
      token: token || undefined,
    }),
    [token]
  );

  const activeChain: any = useMemo(() => {
    return RuntimeConfiguration.ACTIVE_CHAIN_ID ?? 'sepolia';
  }, [])

  useEffect(() => {
    if (clientOptions.token) {
      StorageService.token.setValue(clientOptions.token);
    }
  }, [clientOptions]);

  const fetchContentData = useCallback(async () => {
    try {
      const response = await fetch(RuntimeConfiguration.CONTENT_URL);
      const json = await response.json();
      setContent(json as ContentObject);
    } catch {}
  }, []);

  useEffect(() => {
    fetchContentData();
  }, [fetchContentData]);

  if (!theme || !content) {
    return <></>;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${RuntimeConfiguration.GOOGLE_ANALYTICS_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${RuntimeConfiguration.GOOGLE_ANALYTICS_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Script
        id="gtm-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${RuntimeConfiguration.GOOGLE_TAG_MANAGER_ID}');`,
        }}
      />
      <ContentContext.Provider value={{ content, setContent }}>
        <WalletContext.Provider value={{ wallet, setWallet }}>
          <Head>
            <title>{content.title}</title>
            <meta name="description" content={content.description} />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="../../public/favicon.ico" />
          </Head>
          <AuthenticationProvider>
            <ClaimManagementProvider
              theme={theme}
              clientOptions={clientOptions}
              activeChain={ activeChain }
              clientId={ RuntimeConfiguration.CLIENT_ID }
              walletConnectProjectId={
                RuntimeConfiguration.WALLET_CONNECT_PROJECT_ID
              }
              onAuthenticated={setToken}
            >
              <GlobalStyles styles={styles} />
              <Component {...pageProps} />
            </ClaimManagementProvider>
          </AuthenticationProvider>
        </WalletContext.Provider>
      </ContentContext.Provider>
    </>
  );
}
