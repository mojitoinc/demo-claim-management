import React, { createContext, useContext, useState, useMemo } from "react";

export interface ConnectType {
  apiDomain: string;
  orgId: string;
}

export interface ContextType {
  authDetails: ConnectType;
  setAuthDetails(f: ConnectType | ((prev: ConnectType) => ConnectType)): void;
}

interface AuthDetailsProviderProps {
  children: React.ReactNode;
}

const Context = createContext<ContextType>({} as ContextType);

export default Context;

export function useAuthDetails() {
  return useContext(Context);
}

export const AuthDetailsProvider = ({ children }: AuthDetailsProviderProps) => {
  const [authDetails, setAuthDetails] = useState<ConnectType>({
    apiDomain: "https://api-sandbox.mojito.xyz/query",
    orgId: "960ce62a-412d-43ee-b60d-da21ee1ea217",
  });

  const contextValue = useMemo(
    () => ({ authDetails, setAuthDetails }),
    [authDetails, setAuthDetails]
  );

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
