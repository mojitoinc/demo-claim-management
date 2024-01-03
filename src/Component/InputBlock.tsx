import React from "react";
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import { ButtonNameProps } from "@/interface";
import ButtonStack from "./ButtonStack";
import BottomContainer from "./BottomContainer";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

interface ButtonStackProps {
  isClaimAvailable: boolean;
  isSaleStarted: boolean;
  brandLogoURL?: string;
  isSubHeader?: boolean;
  showScheduleDemo?: boolean;
  isMobile: boolean;
  buttonName?: ButtonNameProps;
  firstName?: string;
  lastName?: string;
  email?: string;
  showUserDetailsInputForm?: boolean;
  firstNameError?: string;
  lastNameError?: string;
  emailError?: string;
  checkedError?: string;
  onChangeFirstName?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeLastName?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeEmail?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClickClaim: () => void;
  onClickDemo: () => void;
  handleClickBrandLogo?: () => void;
}

const InputBlock = ({
  isClaimAvailable,
  isSaleStarted,
  brandLogoURL,
  checked,
  handleCheckboxChange,
  onClickClaim,
  onClickDemo,
  isSubHeader,
  isMobile,
  buttonName,
  firstName,
  lastName,
  email,
  firstNameError,
  lastNameError,
  emailError,
  checkedError,
  showUserDetailsInputForm,
  onChangeEmail,
  onChangeFirstName,
  onChangeLastName,
  handleClickBrandLogo,
}: ButtonStackProps) => {
  const theme = useTheme();
  return (
    <Stack
      sx={{
        display: "flex",
        padding: "16px 0",
        flexDirection: "column",
        alignItems: "left",
        gap: "16px",
        alignSelf: "stretch",
      }}
    >
      {showUserDetailsInputForm && (
        <>
          <Grid container>
            <Grid item xs={12} lg={6} md={6} sm={6}>
              <Box
                sx={{
                  border: `1px solid ${theme?.palette?.background}`,
                  borderRadius: "4px",
                }}
              >
                <TextField
                  required
                  placeholder="First name"
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme?.MojitoClaim?.Hero?.color,
                    },
                    "&::placeholder": {
                      color: theme?.MojitoClaim?.placeholderColor,
                    },
                  }}
                  inputProps={{
                    maxLength: 300,
                  }}
                  InputProps={{
                    style: {
                      maxHeight: "40px",
                      fontWeight: 700,
                    },
                  }}
                  value={firstName}
                  onChange={onChangeFirstName}
                  error={firstNameError ? true : false}
                  helperText={firstNameError ?? ""}
                />
              </Box>
            </Grid>
            <Grid item xs={12} lg={6} md={6} sm={6}>
              <Box
                sx={{
                  border: `1px solid ${theme?.palette?.background}`,
                  borderRadius: "4px",
                  marginLeft: "8px",
                }}
              >
                <TextField
                  required
                  placeholder="Last name"
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme?.MojitoClaim?.Hero?.color,
                    },
                    "&::placeholder": {
                      color: theme?.MojitoClaim?.placeholderColor,
                    },
                  }}
                  inputProps={{
                    maxLength: 300,
                  }}
                  InputProps={{
                    style: {
                      maxHeight: "40px",
                      fontWeight: 700,
                    },
                  }}
                  value={lastName}
                  onChange={onChangeLastName}
                  error={lastNameError ? true : false}
                  helperText={lastNameError ?? ""}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} lg={12} md={12} sm={12}>
              <TextField
                required
                placeholder="Email"
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme?.MojitoClaim?.Hero?.color,
                  },
                  "&::placeholder": {
                    color: theme?.MojitoClaim?.placeholderColor,
                  },
                }}
                inputProps={{
                  maxLength: 300,
                }}
                InputProps={{
                  style: {
                    maxHeight: "40px",
                    fontWeight: 700,
                  },
                }}
                fullWidth
                value={email}
                onChange={onChangeEmail}
                error={emailError ? true : false}
                helperText={emailError ?? ""}
              />
            </Grid>
          </Grid>
          <FormControlLabel
            control={
              <Checkbox
                sx={{ color: theme?.MojitoClaim?.checkBoxColor }}
                checked={checked}
                onChange={handleCheckboxChange}
                color="primary"
                style={{ padding: "0px 0px 0px 8px" }}
              />
            }
            label={
              <Typography fontSize={"12px"} marginLeft="8px">
                I have read & acknowledge the{" "}
                <a
                  style={{
                    textDecoration: "none",
                    color: theme?.palette?.primary?.main,
                  }}
                  href="/terms"
                  target="_blank"
                  rel="noopener"
                >
                  Terms & Conditions
                </a>{" "}
                and{" "}
                <a
                  style={{
                    textDecoration: "none",
                    color: theme?.palette?.primary?.main,
                  }}
                  href="/privacy"
                  target="_blank"
                  rel="noopener"
                >
                  Privacy Policy
                </a>
              </Typography>
            }
          />
          {checkedError && (
            <Typography
              sx={{ color: theme.MojitoClaim?.error, fontSize: "12px" }}
            >
              {checkedError}
            </Typography>
          )}
        </>
      )}
      <Grid container>
        <Grid item xs={12} lg={12}>
          <ButtonStack
            isClaimAvailable={isClaimAvailable}
            isSaleStarted={isSaleStarted}
            isMobile={isMobile}
            buttonName={buttonName}
            onClickClaim={onClickClaim}
          />
        </Grid>
      </Grid>
      {brandLogoURL && (
        <BottomContainer
          brandLogoURL={brandLogoURL ?? ""}
          handleClickBrandLogo={handleClickBrandLogo}
        />
      )}
    </Stack>
  );
};

export default InputBlock;
