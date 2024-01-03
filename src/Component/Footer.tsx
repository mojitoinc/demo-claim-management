import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import { Images } from "@/assets/images";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import router from "next/router";

export interface FooterProps {
  privacyPolicyURL: string;
  termsAndConditionsURL: string;
  twitterURL: string;
  facebookURL: string;
  instagramURL: string;
  youtubeURL: string;
  contactUsURL: string;
  linkedInURL: string;
}

const Footer = ({
  privacyPolicyURL,
  termsAndConditionsURL,
  twitterURL,
  facebookURL,
  instagramURL,
  youtubeURL,
  contactUsURL,
  linkedInURL,
}: FooterProps) => {
  const theme = useTheme();

  const linkStyle = useMemo(
    () => ({
      textDecoration: "none",
      fontFamily: theme?.MojitoClaim?.font?.secondary,
      color: theme?.palette?.text?.primary,
    }),
    [theme]
  );

  return (
    <Box
      sx={{
        ...theme?.MojitoClaim?.Footer,
        background: router?.asPath?.includes("/wallet")
          ? "#fff"
          : theme?.palette?.background?.paper,
        width: "100%",
      }}
    >
      <Grid container sx={{ padding: "21px 28px" }}>
        <Grid item lg={9} md={9} sm={9} xs={12}>
          <Stack
            direction={{ lg: "row", md: "row", sm: "row", xs: "column" }}
            spacing={{ lg: 3, md: 3, sm: 3, xs: 1 }}
          >
            {termsAndConditionsURL && (
              <a
                rel="noreferrer"
                href={termsAndConditionsURL}
                target="_blank"
                style={linkStyle}
              >
                Terms & Conditions
              </a>
            )}
            {privacyPolicyURL && (
              <a
                rel="noreferrer"
                href={privacyPolicyURL}
                target="_blank"
                style={linkStyle}
              >
                Privacy Policy
              </a>
            )}
            {contactUsURL && (
              <a
                rel="noreferrer"
                href={contactUsURL}
                target="_blank"
                style={linkStyle}
              >
                Contact Us
              </a>
            )}
          </Stack>
        </Grid>
        <Grid
          item
          lg={3}
          md={3}
          sm={3}
          xs={12}
          sx={{
            display: "flex",
            paddingTop: { lg: 0, md: 0, sm: 0, xs: "24px" },
            justifyContent: {
              lg: "flex-end",
              md: "flex-end",
              sm: "flex-end",
              xs: "flex-start",
            },
          }}
        >
          <Stack direction="row" spacing={3}>
            {instagramURL && (
              <a href={instagramURL} target="_blank" rel="noreferrer">
                <InstagramIcon
                  sx={{ color: theme?.palette?.background?.default }}
                />
              </a>
            )}
            {twitterURL && (
              <a rel="noreferrer" href={twitterURL} target="_blank">
                <TwitterIcon
                  sx={{ color: theme?.palette?.background?.default }}
                />
              </a>
            )}
            {facebookURL && (
              <a href={facebookURL} target="_blank" rel="noreferrer">
                <FacebookIcon
                  sx={{ color: theme?.palette?.background?.default }}
                />
              </a>
            )}
            {youtubeURL && (
              <a href={youtubeURL} target="_blank" rel="noreferrer">
                <YouTubeIcon
                  sx={{ color: theme?.palette?.background?.default }}
                />
              </a>
            )}
            {linkedInURL && (
              <a href={linkedInURL} target="_blank" rel="noreferrer">
                <Box marginTop="3px">
                  <LinkedInIcon sx={{ color: theme?.palette?.text?.primary }} />
                </Box>
              </a>
            )}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Footer;
