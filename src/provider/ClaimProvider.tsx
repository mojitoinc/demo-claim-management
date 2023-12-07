import React, { useMemo, useState, useEffect, useContext } from 'react'
import { ClaimManagementProvider } from '@mojito-inc/claim-management';
import { RuntimeConfiguration } from '@/configuration';
import { ContentObject } from '@/interface';
import { StorageService } from '@/services';
import { makeTheme } from '@/theme';
import Context from './index';
import { useAuthDetails } from './AuthProvider';

interface ClaimProviderProps {
    children: JSX.Element[];
}

const ClaimProvider = ({ children }: ClaimProviderProps) => {
    const { content } = useContext(Context);
    const { authDetails } = useAuthDetails();
    const theme: any = useMemo(() => {
        if (content?.theme) return makeTheme(content?.theme);
      }, [content]);

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
        return RuntimeConfiguration.ACTIVE_CHAIN_ID ?? 'sepolia';
      }, [])
    
      useEffect(() => {
        if (clientOptions.token) {
          StorageService.token.setValue(clientOptions.token);
        }
      }, [clientOptions]);
  return (
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
        { children }
    </ClaimManagementProvider>
  )
}

export default ClaimProvider