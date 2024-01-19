import { themeProps } from "@/interface";

export const createStyles = (theme: themeProps) => ({
  "::-webkit-scrollbar": {
    width: "6px",
  },

  "::-webkit-scrollbar-thumb": {
    backgroundColor: '#616161',
    borderRadius: "6px",
  },

  "::-webkit-scrollbar-track": {
    backgroundColor: '#616161',
  },

  "html, body": {
    fontFamily: 'Sneak',
    minHeight: "100vh",
    margin: 0,
    background: '#fff',
  },

  body: {
    fontFamily: 'Sneak',
    overflowY: "scroll",
  },
});
