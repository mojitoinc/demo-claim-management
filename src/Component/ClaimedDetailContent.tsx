import React from "react";
import Image from "next/image";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

interface ClaimedDetailContentProps {
  name?: string;
  imageURL?: string;
  buttonText?: string;
  walletAddress?: string;
  onClickButton?: () => void;
}

const ClaimedDetailContent = ({
  name,
  imageURL,
  buttonText,
  walletAddress,
  onClickButton,
}: ClaimedDetailContentProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Stack flexDirection={"row"} alignItems={"flex-start"}>
      <Stack>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            fontSize: isMobile ? "2rem" : "3rem",
            marginBottom: "8px",
            color: theme?.palette?.text?.primary,
          }}
        >{`Welcome${name ? `${name}!` : "!"}`}</Typography>
        <Button
          sx={{ maxWidth: 185, lineHeight: 1, padding: "16px 0" }}
          onClick={() => onClickButton?.()}
        >
          {buttonText || "View Wallet"}
        </Button>
      </Stack>
    </Stack>
  );
};

export default ClaimedDetailContent;
