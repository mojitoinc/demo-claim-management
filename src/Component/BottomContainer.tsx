import React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";

interface BottomContainerProps {
  brandLogoURL: string;
  handleClickBrandLogo?: () => void;
}
const BottomContainer = ({
  brandLogoURL,
  handleClickBrandLogo,
}: BottomContainerProps) => {
  const theme = useTheme();
  return (
    <Box display="flex" flexDirection="column" paddingTop="24px">
      <Typography fontSize="12px" color={theme?.palette?.text?.primary}>
        powered by{" "}
        <Image
          unoptimized
          style={{
            width: "58px",
            height: "13px",
            marginLeft: "2px",
            cursor: "pointer",
          }}
          src={brandLogoURL}
          onClick={handleClickBrandLogo}
          alt="logo"
          width={58}
          height={13}
        />
      </Typography>
    </Box>
  );
};

export default BottomContainer;
