import { createTheme } from "@mui/material/styles";

export const SecondaryMarketTheme = createTheme({
  typography: {
    fontFamily: "Sneak",
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
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
          font-family: Sneak;
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          text-transform: none;
          font-size: 16px;
          color: #000;
        }
      `,
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "Sneak",
          textTransform: "none",
          borderRadius: "4px",
          fontWeight: 500,
          fontSize: "16px",
          backgroundColor: "#fff",
          color: "#000",
          "&:hover": {
            backgroundColor: "#000",
            color: "#fff",
          },
          "&:disabled": {
            backgroundColor: "#F5F5F5",
            color: "#BDBDBD",
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
      main: "#000",
      light: "#A9AFB8",
      dark: "#000",
    },
    secondary: {
      main: "#A6FF00",
      light: "#C9FF66",
      dark: "#95E600",
    },
    appDefaultColor: {
      primary: {
        dark: "#FFFFFF",
        light: "#FFFFFF80",
      },
      secondary: {
        dark: "#000000",
        light: "#00000080",
      },
    },
    border: {
      dark: "#616161",
      light: "#E0E0E0",
    },
    background: {
      default: "#000",
      paper: "#fff",
    },
    text: {
      primary: "#000",
    },
    grey: {
      50: "#FAFAFA",
      100: "#F5F5F5",
      200: "#EEEEEE",
      300: "#E0E0E0",
      400: "#BDBDBD",
      500: "#9E9E9E",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
    },
    divider: "#fff",
    toastError: {
      50: "#FEE3E5",
      100: "#FDBBBD",
      200: "#E2807A",
      300: "#CD564F",
      400: "#D0372E",
      500: "#CE2818",
      600: "#BF1E18",
      700: "#AD1414",
      800: "#9F0C10",
      900: "#90030F",
    },
    toastSuccess: {
      50: "#E7EFE8",
      100: "#CFDFD1",
      200: "#B7CFB9",
      300: "#9FBFA2",
      400: "#6EA074",
      500: "#3E8045",
      600: "#0E6017",
      700: "#0D5615",
      800: "#0B4D12",
      900: "#0A4310",
      1000: "#1BB82D",
      1100: "#D9F9DD",
    },
    toastWarning: {
      50: "#FFFFE5",
      100: "#FFFEC0",
      200: "#FCFB99",
      300: "#F8F676",
      400: "#F5F15C",
      500: "#F0EB47",
      600: "#FBDF47",
      700: "#FDC740",
      800: "#FCAD36",
      900: "#F98028",
    },
  },
});
