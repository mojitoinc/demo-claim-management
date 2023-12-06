import React, { useMemo, useState } from "react";
import { SecondaryMarketProvider } from "@mojito-inc/secondary-market";
import { SecondaryMarketTheme } from "@/theme";
import { configuration } from "@/config";
import { StorageService } from "@/services/StorageService";

interface AuthenticationProviderProps {
  children: JSX.Element;
}

const AuthenticationProvider = ({ children }: AuthenticationProviderProps) => {
  const [token, setToken] = useState<string>();
  const tokenData = StorageService.token.getValue();
  const client = useMemo(
    () => ({
      uri: configuration.API_HOSTNAME,
      token: tokenData
        ? `Bearer ${tokenData}`
        : token
        ? `Bearer ${token}`
        : undefined,
    }),
    [token, tokenData]
  );

  return (
    <SecondaryMarketProvider
      theme={SecondaryMarketTheme}
      clientOptions={client}
    >
      {children}
    </SecondaryMarketProvider>
  );
};

export default AuthenticationProvider;
