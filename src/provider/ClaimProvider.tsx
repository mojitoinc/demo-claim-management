import React, { useMemo, useState, useEffect } from "react";
import { ClaimManagementProvider } from "@mojito-inc/claim-management";
import { RuntimeConfiguration } from "@/configuration";
import { StorageService } from "@/services";
import { theme } from "@/theme";
import { useAuthDetails } from "./AuthProvider";

interface ClaimProviderProps {
  children: JSX.Element;
}

const ClaimProvider = ({ children }: ClaimProviderProps) => {
  const { authDetails } = useAuthDetails();

  const [token, setToken] = useState<string>(
    StorageService.token.getValue() ?? ""
  );
  const clientOptions = useMemo(
    () => ({
      uri: authDetails?.apiDomain,
      token: token || undefined,
    }),
    [token, authDetails?.apiDomain]
  );

  const activeChain: any = useMemo(() => {
    return RuntimeConfiguration.ACTIVE_CHAIN_ID ?? "sepolia";
  }, []);

  useEffect(() => {
    if (clientOptions.token) {
      StorageService.token.setValue(clientOptions.token);
    }
  }, [clientOptions]);
  return (
    <ClaimManagementProvider
      theme={theme}
      clientOptions={clientOptions}
      activeChain={activeChain}
      clientId={RuntimeConfiguration.CLIENT_ID}
      walletConnectProjectId={RuntimeConfiguration.WALLET_CONNECT_PROJECT_ID}
      onAuthenticated={setToken}
    >
      {children}
    </ClaimManagementProvider>
  );
};

export default ClaimProvider;
