import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import parse from "html-react-parser";
import Container from "@mui/material/Container";
import useMediaQuery from "@mui/material/useMediaQuery";
import ButtonStack from "./ButtonStack";
import { ButtonNameProps } from "@/interface";

interface SubHeaderBlockProps {
  title: string;
  description: string;
  showScheduleDemo?: boolean;
  buttonName?: ButtonNameProps;
  onClickClaim: () => void;
  onClickScheduleDemo: () => void;
}

const SubHeaderBlock = ({
  description,
  title,
  onClickClaim,
  onClickScheduleDemo,
  showScheduleDemo,
  buttonName,
}: SubHeaderBlockProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <Box
      sx={{
        ...theme?.MojitoClaim?.Hero,
        fontWeight: 700,
        fontSize: "16px",
        padding: { lg: "64px 64px 40px 64px", xs: "40px 0 0 0" },
        textAlign: "center",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          sx={{
            fontFamily: theme?.MojitoClaim?.font?.secondary,
            fontSize: "60px",
            lineHeight: "100%",
            fontWeight: 700,
          }}
        >
          {title}
        </Typography>
        <Typography sx={{ padding: "24px 0px" }}>
          {parse(description)}
        </Typography>
        <ButtonStack
          onClickClaim={onClickClaim}
          isMobile={isMobile}
          buttonName={buttonName}
        />
      </Container>
    </Box>
  );
};

export default SubHeaderBlock;
