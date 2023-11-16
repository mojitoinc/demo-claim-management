import React, { useMemo, useState } from "react";
import { ClaimManagementProvider } from "@mojito-inc/claim-management";
import { claimTheme } from "../theme";
import { palette } from "../theme/palette";
import { StorageService } from "../service/StorageService";

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
      uri: "https://api-dev.mojito.xyz/query",
      token: token ? `Token ${token}` : undefined,
    }),
    [token]
  );
  return (
    <ClaimManagementProvider
      theme={theme} // Theme customization
      clientOptions={clientOptions} // Pass bearer token and api url
      walletConnectProjectId="1e202c9116dfff483ed8b1c518d06495" // Wallet connect project id
      onAuthenticated={setToken} // callback authentication
    >
        <>
            { children }
        </>
    </ClaimManagementProvider>
  );
};

export default ClaimProvider;
