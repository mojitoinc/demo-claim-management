import React, { useMemo } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import Close from "@mui/icons-material/Close";

export interface UserDetailsFormContainerProps {
  buttonName: string;
  anchorEl?: HTMLElement | null;
  firstName?: string;
  lastName?: string;
  email?: string;
  checked?: boolean;
  firstNameError?: string;
  lastNameError?: string;
  emailError?: string;
  checkedError?: string;
  onChangeFirstName?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeLastName?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeEmail?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleMenuClose?: () => void;
  handleMenuOpen?: () => void;
}

const UserDetailsFormContainer = ({
  buttonName,
  anchorEl,
  checked,
  firstName,
  lastName,
  email,
  firstNameError,
  lastNameError,
  emailError,
  checkedError,
  onChangeEmail,
  onChangeFirstName,
  onChangeLastName,
  handleCheckboxChange,
  handleMenuClose,
  handleMenuOpen,
}: UserDetailsFormContainerProps) => {
  const theme = useTheme();
  const modalStyle = useMemo(() => {
    return {
      position: "absolute",
      bottom: "0",
      width: "100%",
      bgcolor: theme.palette.background.paper,
      overflowY: "auto",
      height: "384px",
      maxHeight: "100%",
    };
  }, [theme]);

  return (
    <Box>
      <Modal open={Boolean(anchorEl)}>
        <Box sx={modalStyle}>
          <Box
            sx={{
              padding: "16px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Box display="flex" flexDirection="row">
              <Typography
                sx={{ fontSize: "20px", fontWeight: 700, padding: "8px" }}
              >
                Enter details to claim pass
              </Typography>
              <Box position="fixed" sx={{ right: "8px", marginTop: "8px" }}>
                <Close
                  sx={{
                    cursor: "pointer",
                    color: theme.palette.background.default,
                  }}
                  onClick={handleMenuClose}
                />
              </Box>
            </Box>
            <Box width="100%">
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
            <Box padding="16px" width="100%">
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
            <Box width="100%">
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
            </Box>
            <FormControlLabel
              sx={{ marginTop: "16px" }}
              control={
                <Checkbox
                  sx={{ color: theme?.MojitoClaim?.checkBoxColor }}
                  checked={checked}
                  onChange={handleCheckboxChange}
                  color="primary"
                />
              }
              label={
                <Typography fontSize={"12px"}>
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
          </Box>
          <Box marginLeft="16px" width="100%">
            <Button
              sx={{ height: "40px", width: "calc(100% - 32px)" }}
              onClick={handleMenuOpen}
            >
              {buttonName ?? "Claim My Pass Now"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default UserDetailsFormContainer;
