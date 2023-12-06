import React from "react";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import { ButtonNameProps } from "@/interface";

interface ButtonStackProps {
  isClaimAvailable?: boolean;
  isSaleStarted?: boolean;
  isMobile: boolean;
  buttonName?: ButtonNameProps;
  onClickClaim: () => void;
}

const ButtonStack = ({
  isClaimAvailable,
  isSaleStarted,
  onClickClaim,
  isMobile,
  buttonName,
}: ButtonStackProps) => {
  const theme = useTheme();
  return (
    <Stack direction={isMobile ? "row" : "column"} spacing={2}>
      <Button
        sx={{
          width: "100%",
          marginBottom: "16px",
          "&:disabled": {
            backgroundColor: theme?.palette?.grey?.[100],
            color: theme?.palette?.background?.paper,
          },
        }}
        onClick={onClickClaim}
        disabled={!isClaimAvailable}
      >
        {isClaimAvailable
          ? buttonName?.primary || "Claim My Pass Now"
          : !isSaleStarted 
          ? buttonName?.teritary
          : buttonName?.secondary || "All Available Collected"}
      </Button>
    </Stack>
  );
};

export default ButtonStack;
