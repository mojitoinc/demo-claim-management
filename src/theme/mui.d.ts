import "@mui/material/styles";
import { MojitoClaimManagementTheme } from "./MojitoClaimManagementTheme";

declare module "@mui/material/styles" {
  export interface Theme {
    MojitoClaim?: MojitoClaimManagementTheme;
  }
  // allow configuration using `createTheme`
  export interface ThemeOptions {
    MojitoClaim?: MojitoClaimManagementTheme;
  }
  export interface Palette {
    appDefaultColor?: {
      primary?: SecondaryTheme;
      secondary?: SecondaryTheme;
    };
    border?: SecondaryTheme;
    toastError?: ColorPartial;
    toastSuccess?: ColorPartial;
    toastWarning?: ColorPartial;
  }
  // allow configuration using `createTheme`
  export interface PaletteOptions {
    appDefaultColor?: {
      primary?: SecondaryTheme;
      secondary?: SecondaryTheme;
    };
    border?: SecondaryTheme;
    toastError?: ColorPartial;
    toastSuccess?: ColorPartial;
    toastWarning?: ColorPartial;
  }
}
