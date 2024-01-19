import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  typography: {
    fontFamily: 'Slate',
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button':
            {
              display: 'none',
            },
          '& input[type=number]': {
            MozAppearance: 'textfield',
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
              @font-face {
                font-family: "Slate";
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
          fontFamily: 'Slate',
          textTransform: 'none',
          borderRadius: '4px',
          fontWeight: 700,
          fontSize: '16px',
          backgroundColor: '#FDCC35',
          color: '#000',
          '&:hover': {
            backgroundColor: '#FDCC35',
            color: '#000',
            opacity: 0.5,
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          border: '1px solid #D7D8DB',
          boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.08)',
          borderRadius: '4px',
        },
      },
    },
    MuiDivider: {
      variants: [
        {
          props: { orientation: 'horizontal' },
          style: {
            ':before': {
              borderTop: 'thin solid #D7D8DB',
            },
            ':after': {
              borderTop: 'thin solid #D7D8DB',
            },
          },
        },
      ],
    },
  },
  palette: {
    primary: {
      main: '#FDCC35',
    },
    secondary: {
      main: '#356045',
      light: '#F5F5F5',
    },
    background: {
      default: '#000',
    },
    text: {
      primary: '#000',
    },
    grey: {
      100: '#868b93',
      500: '#A1A5AB',
    },
    divider: '#fff',
    toastWarning: {
      50: '#FFFFE5',
      100: '#FFFEC0',
      200: '#FCFB99',
      300: '#F8F676',
      400: '#F5F15C',
      500: '#F0EB47',
      600: '#FBDF47',
      700: '#FDC740',
      800: '#FCAD36',
      900: '#F98028',
    },
    toastError: {
      50: '#FEE3E5',
      100: '#FDBBBD',
      200: '#E2807A',
      300: '#CD564F',
      400: '#D0372E',
      500: '#CE2818',
      600: '#BF1E18',
      700: '#AD1414',
      800: '#9F0C10',
      900: '#90030F',
    },
  },
  MojitoClaim: {
    font: {
      primary: 'Slate',
      secondary: 'Slate',
      tertiary: 'Sneak',
    },
    Header: {
      background: '#000',
    },
    Footer: {
      background: '#000',
      color: '#fff',
    },
    Hero: {
      background: '#356045',
      color: '#fff',
    },
    Discount: {
      inProgressColor: '#F98028',
      inProgressBackground: '#FFFEC0',
    },
    delivery: {
      textColor: '#000',
      tokenTrackerColor: '#000',
    },
    error: '#BF1E18',
    success: '#3E8045',
    deliveryBackgroundColor: '#FAFBFB',
    linkColor: '#6563FD',
    // textTertiary: '#868b93',
  },
});
