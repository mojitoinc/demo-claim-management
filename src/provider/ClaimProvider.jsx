import React, { useMemo, useState } from "react";
import { ClaimManagementProvider } from "@mojito-inc/claim-management";
import { claimTheme } from "../theme";
import { palette } from "../theme/palette";
import { StorageService } from "../service/StorageService";

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
      theme={theme}
      clientOptions={clientOptions}
      walletConnectProjectId="1e202c9116dfff483ed8b1c518d06495"
      onAuthenticated={setToken}
    >
        <>
            { children }
        </>
    </ClaimManagementProvider>
  );
};

export default ClaimProvider;
