import React, { useCallback, useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import useMediaQuery from "@mui/material/useMediaQuery";
import parse from "html-react-parser";
import Image from "next/image";
import ButtonStack from "./ButtonStack";
import { isVideo } from "@/utils/isVideo.utils";
import { ButtonNameProps, UserDetail, UserDetailError } from "@/interface";
import InputBlock from "./InputBlock";
import BottomContainer from "./BottomContainer";
import UserDetailsFormContainer from "./UserDetailsFormContainer";
import Button from "@mui/material/Button";

export interface HeroBlockProps {
  isClaimAvailable: boolean;
  isSaleStarted: boolean;
  brandLogoURL?: string;
  title: string;
  subTitle: string;
  description: string;
  imageURL: string;
  showScheduleDemo?: boolean;
  buttonName?: ButtonNameProps;
  firstName?: string;
  lastName?: string;
  email?: string;
  anchorEl?: HTMLElement | null;
  showUserDetailsInputForm?: boolean;
  userDetail?: UserDetail;
  userDetailError?: UserDetailError;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeFirstName?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeLastName?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeEmail?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleMenuOpen?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleMenuClose?: () => void;
  onClickClaim: () => void;
  onClickScheduleDemo: () => void;
  handleClickBrandLogo?: () => void;
}
const HeroBlock = ({
  isClaimAvailable,
  isSaleStarted,
  brandLogoURL,
  title,
  subTitle,
  description,
  imageURL,
  showScheduleDemo,
  buttonName,
  userDetail,
  userDetailError,
  anchorEl,
  showUserDetailsInputForm,
  handleCheckboxChange,
  onChangeEmail,
  onChangeFirstName,
  onChangeLastName,
  handleMenuClose,
  handleMenuOpen,
  onClickClaim,
  onClickScheduleDemo,
  handleClickBrandLogo,
}: HeroBlockProps) => {
  const theme = useTheme();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (videoRef) {
      videoRef.current?.load();
    }
  }, []);

  return (
    <Box
      sx={{
        ...theme?.MojitoClaim?.Hero,
        fontWeight: 700,
        fontSize: "16px",
        padding: {
          lg: "0px 120px 120px 120px",
          md: "0px 120px 120px 120px",
          xs: "16px 0 0 0",
        },
        marginTop: isMobile ? "0px" : "80px",
        textAlign: isMobile ? "center" : "left",
        backgroundColor: theme?.palette?.background?.paper,
      }}
    >
      <Container maxWidth="lg">
        {isMobile && (
          <Grid container>
            <Grid
              item
              xs={12}
              lg={6}
              sx={{
                display: "flex",
                justifyContent: {
                  lg: "flex-end",
                  md: "flex-end",
                  xs: "flex-start",
                },
                padding: { lg: 0, md: 0, xs: "0px 0px 30px" },
              }}
            >
              {isVideo(imageURL) ? (
                <video
                  ref={videoRef}
                  controls
                  loop
                  muted
                  playsInline
                  autoPlay={true}
                  style={{ width: "100%", height: "100%" }}
                >
                  <source src={imageURL} />
                </video>
              ) : (
                <Image
                  unoptimized
                  style={{
                    height: "auto",
                    maxHeight: "200px",
                    objectFit: "contain",
                  }}
                  width={500}
                  height={200}
                  src={imageURL}
                  alt="hero block"
                />
              )}
            </Grid>
          </Grid>
        )}
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6} md={6} sm={6}>
            <Box>
              <Typography sx={{ fontWeight: 700 }}>{subTitle}</Typography>
              <Typography
                sx={{
                  fontFamily: theme?.MojitoClaim?.font?.tertiary,
                  fontSize: isMobile ? "32px" : "48px",
                  lineHeight: isMobile ? "38px" : "100%",
                  fontWeight: 700,
                  color: theme?.palette?.text?.primary,
                }}
              >
                {parse(title)}
              </Typography>
              <Typography
                sx={{
                  padding: isMobile ? "24px 0px 0px" : "24px 0px",
                  color: theme?.palette?.text?.primary,
                }}
              >
                {parse(description)}
              </Typography>
              {!isMobile ? (
                <InputBlock
                  isClaimAvailable={isClaimAvailable}
                  isSaleStarted={isSaleStarted}
                  brandLogoURL={brandLogoURL}
                  showUserDetailsInputForm={showUserDetailsInputForm}
                  showScheduleDemo={showScheduleDemo}
                  isMobile={isMobile}
                  buttonName={buttonName}
                  firstName={userDetail?.firstName}
                  lastName={userDetail?.lastName}
                  email={userDetail?.email}
                  checked={userDetail?.checked}
                  firstNameError={userDetailError?.firstNameError}
                  lastNameError={userDetailError?.lastNameError}
                  emailError={userDetailError?.emailError}
                  checkedError={userDetailError?.checkedError}
                  onChangeFirstName={onChangeFirstName}
                  onChangeLastName={onChangeLastName}
                  onChangeEmail={onChangeEmail}
                  handleCheckboxChange={handleCheckboxChange}
                  onClickClaim={onClickClaim}
                  onClickDemo={onClickScheduleDemo}
                  handleClickBrandLogo={handleClickBrandLogo}
                />
              ) : (
                brandLogoURL && (
                  <BottomContainer
                    brandLogoURL={brandLogoURL ?? ""}
                    handleClickBrandLogo={handleClickBrandLogo}
                  />
                )
              )}
            </Box>
          </Grid>
          {!isMobile && (
            <Grid
              item
              xs={12}
              lg={6}
              md={6}
              sm={6}
              sx={{
                display: "flex",
                justifyContent: {
                  lg: "flex-end",
                  md: "flex-end",
                  xs: "flex-start",
                },
                padding: {
                  lg: "0 0 0 40px !important",
                  md: "0 0 0 40px !important",
                  xs: "40px 0px",
                },
              }}
            >
              {isVideo(imageURL) ? (
                <video
                  ref={videoRef}
                  controls
                  loop
                  muted
                  playsInline
                  autoPlay={true}
                  style={{ width: "100%", height: "100%" }}
                >
                  <source src={imageURL} />
                </video>
              ) : (
                <Box sx={{ maxWidth: { lg: "500px", md: "100%" } }}>
                  <Image
                    unoptimized
                    style={{
                      maxWidth: "500px",
                      width: "100%",
                      height: "auto",
                      maxHeight: "434px",
                    }}
                    width={500}
                    height={434}
                    src={imageURL}
                    alt="hero block"
                  />
                </Box>
              )}
            </Grid>
          )}
          {isMobile && (
            <Grid container>
              <Grid item xs={12} marginTop="82px">
                <Box
                  width="calc(100% - 16px)"
                  padding="0px 16px 16px 16px"
                  sx={{
                    position: "fixed",
                    bottom: 0,
                    background: theme?.palette?.background?.paper,
                  }}
                >
                  <Button
                    disabled={!isClaimAvailable}
                    sx={{
                      height: "40px",
                      width: "100%",
                      "&:disabled": {
                        backgroundColor: theme?.palette?.grey?.[100],
                        color: theme?.palette?.background?.paper,
                      },
                    }}
                    onClick={
                      showUserDetailsInputForm ? handleMenuOpen : onClickClaim
                    }
                  >
                    {isClaimAvailable
                      ? buttonName?.primary || "Claim My Pass Now"
                      : !isSaleStarted
                      ? buttonName?.teritary
                      : buttonName?.secondary || "All Available Collected"}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          )}
        </Grid>
        <UserDetailsFormContainer
          handleCheckboxChange={handleCheckboxChange}
          buttonName={buttonName?.primary ?? ""}
          firstName={userDetail?.firstName}
          lastName={userDetail?.lastName}
          email={userDetail?.email}
          checked={userDetail?.checked}
          firstNameError={userDetailError?.firstNameError}
          lastNameError={userDetailError?.lastNameError}
          emailError={userDetailError?.emailError}
          checkedError={userDetailError?.checkedError}
          onChangeFirstName={onChangeFirstName}
          onChangeLastName={onChangeLastName}
          onChangeEmail={onChangeEmail}
          anchorEl={anchorEl}
          handleMenuClose={handleMenuClose}
          handleMenuOpen={onClickClaim}
        />
      </Container>
    </Box>
  );
};
export default HeroBlock;
