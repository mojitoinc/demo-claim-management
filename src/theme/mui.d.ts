import "@mui/material/styles";
import { MojitoCoreUITheme } from "@mojito-inc/core-ui";
import { MojitoClaimManagementTheme } from "./MojitoClaimManagementTheme";

declare module "@mui/material/styles" {
  export interface Theme {
    MojitoClaim?: MojitoClaimManagementTheme;
    MojitoCoreUI?: MojitoCoreUITheme;
  }
  // allow configuration using `createTheme`
  export interface ThemeOptions {
    MojitoClaim?: MojitoClaimManagementTheme;
    MojitoCoreUI?: MojitoCoreUITheme;
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
