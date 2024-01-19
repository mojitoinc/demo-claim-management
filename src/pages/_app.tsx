import type { AppProps } from "next/app";
import React, { useMemo, useState, useEffect } from "react";
import { RuntimeConfiguration } from "../configuration";
import { WalletData } from "@/interface";
import Head from "next/head";
import { WalletContext } from "../provider/WalletContext";
import "../theme/fonts.css";
import { StorageService } from "@/services";
import { AuthDetailsProvider } from "@/provider/AuthProvider";
import ClaimProvider from "@/provider/ClaimProvider";

export default function App({ Component, pageProps }: AppProps) {
  const [wallet, setWallet] = useState<WalletData>({} as WalletData);

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

  useEffect(() => {
    if (clientOptions.token) {
      StorageService.token.setValue(clientOptions.token);
    }
  }, [clientOptions]);

  return (
    <>
      <AuthDetailsProvider>
        <WalletContext.Provider value={{ wallet, setWallet }}>
          <Head>
            <title>Mojito claim demo</title>
            <meta name="description" content="Mojito claim demo" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="../../public/favicon.ico" />
          </Head>
          <ClaimProvider>
            <Component {...pageProps} />
          </ClaimProvider>
        </WalletContext.Provider>
      </AuthDetailsProvider>
    </>
  );
}
