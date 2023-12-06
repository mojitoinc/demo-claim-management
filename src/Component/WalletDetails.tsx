import React from "react";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import ExitToAppOutlined from "@mui/icons-material/ExitToAppOutlined";
import FileCopyOutlined from "@mui/icons-material/FileCopyOutlined";
import AccountBalanceWalletOutlined from "@mui/icons-material/AccountBalanceWalletOutlined";
import AccountContainer from "./AccountContainer";
import router from "next/router";

export interface WalletsDetailsProps {
  currencyIcon: string;
  walletBalance: number;
  walletAddress: string;
  currency: string;
  copied: string;
  isMobile: boolean;
  onClickLogout: () => void;
  onClickCopy: (data: string) => void;
  onClickViewWallet: () => void;
}

const WalletDetails = ({
  copied,
  currency,
  currencyIcon,
  walletAddress,
  walletBalance,
  isMobile,
  onClickLogout,
  onClickCopy,
  onClickViewWallet,
}: WalletsDetailsProps) => {
  const theme = useTheme();
  return (
    <Box padding={isMobile ? "8px" : "16px"}>
      {walletAddress && (
        <>
          <AccountContainer
            currency={currency}
            currencyIcon={currencyIcon}
            walletAddress={walletAddress}
            walletBalance={walletBalance}
          />
          <Button
            fullWidth
            onClick={onClickViewWallet}
            sx={{
              marginTop: "24px",
              backgroundColor: theme?.palette?.background?.paper,
              color: theme?.palette?.text?.primary,
              fontWeight: 700,
              fontSize: "16px",
              border: `1px solid ${theme.palette?.grey?.[400]}`,
            }}
          >
            <AccountBalanceWalletOutlined
              sx={{
                height: "20px",
                weight: "20px",
                marginRight: "6px",
                cursor: "pointer",
              }}
            />
            View Wallet
          </Button>
          <Button
            fullWidth
            onClick={() => onClickCopy(walletAddress)}
            sx={{
              marginTop: "24px",
              backgroundColor: theme?.palette?.background?.paper,
              color: theme?.palette?.text?.primary,
              fontWeight: 700,
              fontSize: "16px",
              border: `1px solid ${theme.palette?.grey?.[400]}`,
            }}
          >
            <Tooltip
              open={copied === walletAddress && copied != ""}
              title="Copied!"
            >
              <FileCopyOutlined
                sx={{
                  height: "20px",
                  weight: "20px",
                  marginRight: "6px",
                  cursor: "pointer",
                }}
              />
            </Tooltip>
            Copy Wallet Address
          </Button>
          <Button
            fullWidth
            onClick={onClickLogout}
            sx={{
              marginTop: "24px",
              backgroundColor: theme?.palette?.background?.paper,
              color: theme?.palette?.text?.primary,
              fontWeight: 700,
              fontSize: "16px",
              border: `1px solid ${theme.palette?.grey?.[400]}`,
            }}
          >
            <Tooltip open={false} title="Copied!">
              <ExitToAppOutlined
                sx={{
                  height: "20px",
                  weight: "20px",
                  marginRight: "6px",
                  cursor: "pointer",
                }}
              />
            </Tooltip>
            Log Out
          </Button>
        </>
      )}
    </Box>
  );
};

export default WalletDetails;
