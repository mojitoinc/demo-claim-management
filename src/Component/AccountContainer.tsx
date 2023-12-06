import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import React from "react";
import FiberManualRecord from "@mui/icons-material/FiberManualRecord";
import { truncateAddress } from "../utils/truncateAddress.utils";
import Image from "next/image";

export interface AccountContainerProps {
  currency: string;
  currencyIcon: string;
  walletAddress: string;
  walletBalance: number;
}

const AccountContainer = ({
  currency,
  currencyIcon,
  walletAddress,
  walletBalance,
}: AccountContainerProps) => {
  const theme = useTheme();
  return (
    <Box
      padding="8px"
      height="48px"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        border: `1px solid ${theme.palette?.primary?.dark}`,
        borderRadius: "4px",
      }}
    >
      <Typography fontSize="12px" fontWeight="500">
        Connected Wallet:
      </Typography>
      <Typography color={theme?.palette?.primary?.main} fontSize="16px">
        <FiberManualRecord
          sx={{
            height: "8px",
            width: "8px",
            color: walletAddress
              ? theme?.palette?.success?.light
              : theme?.palette?.error?.light,
          }}
        />{" "}
        {truncateAddress(walletAddress)}
      </Typography>
    </Box>
  );
};

export default AccountContainer;
