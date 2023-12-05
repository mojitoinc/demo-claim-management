import React, { useMemo, useState } from "react";
import { ClaimManagementProvider } from "@mojito-inc/claim-management";
import { claimTheme } from "../theme";
import { palette } from "../theme/palette";
import { StorageService } from "../service/StorageService";
import { config } from "../config";

// Provider should wrap inside the root file

const ClaimProvider = ({ children }) => {
  const theme = useMemo(() => {
    const res = claimTheme(palette);
    return res;
  }, []);
  const [token, setToken] = useState(
    StorageService.token.getValue() ?? ""
  );
  const clientOptions = useMemo(
    () => ({
      uri: config.API_HOST_URL,
      token: token || undefined,
    }),
    [token]
  );
  return (
    <ClaimManagementProvider
      theme={theme} // Theme customization
      clientOptions={clientOptions} // Pass bearer token and api url
      clientId={ config.CLIENT_ID }
      activeChain={ config.ACTIVE_CHAIN_ID }
      walletConnectProjectId={ config.WALLET_CONNECT_PROJECT_ID } // Wallet connect project id
      onAuthenticated={setToken} // callback authentication
    >
      <>
        { children }
      </>
    </ClaimManagementProvider>
  );
};

export default ClaimProvider;
