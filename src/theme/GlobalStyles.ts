import { themeProps } from "@/interface";

export const createStyles = (theme: themeProps) => ({
  "::-webkit-scrollbar": {
    width: "6px",
  },

  "::-webkit-scrollbar-thumb": {
    backgroundColor: theme?.color?.scrollBarGrey,
    borderRadius: "6px",
  },

  "::-webkit-scrollbar-track": {
    backgroundColor: theme?.color?.scrollBarBackground,
  },

  "html, body": {
    fontFamily: theme.fontFamily.teritary,
    minHeight: "100vh",
    margin: 0,
    background: theme.color.primary,
  },

  body: {
    fontFamily: theme.fontFamily.teritary,
    overflowY: "scroll",
  },
});
