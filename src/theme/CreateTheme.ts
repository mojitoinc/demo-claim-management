import { createTheme } from "@mui/material/styles";
import { themeProps } from "../interface";

export const makeTheme = (theme?: themeProps) => {
  if (!theme) {
    return createTheme();
  }
  return createTheme({
    typography: {
      fontFamily: theme.fontFamily.primary,
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#fff",
              color: "#000",
            },
            "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
              {
                display: "none",
              },
            "& input[type=number]": {
              MozAppearance: "textfield",
            },
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: `
                @font-face {
                  font-family: ${theme.fontFamily.primary};
                  font-style: normal;
                  font-display: swap;
                  font-weight: 400;
                  text-transform: none;
                  font-size: 16px;
                }
              `,
      },
      MuiButton: {
        styleOverrides: {
          root: {
            fontFamily: theme.fontFamily.primary,
            textTransform: "none",
            borderRadius: "4px",
            fontWeight: 700,
            fontSize: "16px",
            backgroundColor: theme.color.secondary,
            color: theme.color.textColorSecondary,
            padding: "6px 12px",
            "&:hover": {
              backgroundColor: theme.color.secondary,
              color: theme.color.textColorSecondary,
            },
            "&:disabled": {
              backgroundColor: theme?.color?.grey,
              color: theme?.color?.primary,
            },
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            border: "1px solid #D7D8DB",
            boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.08)",
            borderRadius: "4px",
          },
        },
      },
      MuiDivider: {
        variants: [
          {
            props: { orientation: "horizontal" },
            style: {
              ":before": {
                borderTop: "thin solid #D7D8DB",
              },
              ":after": {
                borderTop: "thin solid #D7D8DB",
              },
            },
          },
        ],
      },
    },
    palette: {
      primary: {
        main: theme?.color.secondary,
      },
      secondary: {
        main: theme?.color.teritary,
        dark: "#EEEFF4",
      },
      background: {
        paper: theme?.color?.primary,
        default: theme?.color.textColorPrimary,
      },
      text: {
        primary: theme?.color.textColorPrimary,
        secondary: theme?.color?.grey,
      },
      grey: {
        100: theme.color.grey,
      },
      divider: "#fff",
    },
    MojitoClaim: {
      delivery: {
        textColor: theme?.color?.deliveryTextColor,
        tokenTrackerColor: theme?.color?.tokenTrackerColor,
      },
      Header: {
        background: "#000",
        mobileBackground: theme.color.mobileHeaderBackground,
        borderColor: theme.color.headerBorderColor,
      },
      Footer: {
        background: "#000",
        color: "#fff",
      },
      Hero: {
        background: "#FFFFFF",
        color: "#000",
      },
      Discount: {
        inProgressColor: theme.color.inProgressColor,
        inProgressBackground: theme.color.inProgressBackground,
      },
      error: theme.color.error,
      pagination: {
        backgroundColor: theme.color.paginationBackground,
        selectedPageColor: theme.color.paginationSelectedPageColor,
      },
      card: {
        backgroundColor: theme.color.cardBackground,
        titleColor: theme.color.cardTitle,
        linkTextColor: theme.color.cardLink,
      },
      active: theme.color.active,
      accountBackgroundColor: theme.color.accountBackgroundColor,
      placeholderColor: theme.color.placeholderColor,
      checkBoxColor: theme.color.checkBoxColor,
      scrollBar: {
        color: theme?.color?.scrollBarGrey,
        background: theme?.color?.scrollBarBackground,
      },
      deliveryBackgroundColor: theme?.color?.deliveryBackgroundColor,
      linkColor: theme?.color?.linkColor,
      success: "#3E8045",
    },
    MojitoCoreUI: {
      font: {
        primary: theme.fontFamily.primary,
        secondary: theme.fontFamily.secondary,
        tertiary: theme.fontFamily.teritary,
      },
    },
  });
};
