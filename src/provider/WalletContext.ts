import { createContext } from "react";
import { WalletData } from "@/interface";

export interface WalletContextType {
  wallet: WalletData;
  setWallet(f: WalletData | ((prev: WalletData) => WalletData)): void;
}

export const WalletContext = createContext<WalletContextType>(
  {} as WalletContextType
);
