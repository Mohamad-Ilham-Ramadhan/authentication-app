import { createMuiTheme, lighten } from "@material-ui/core/styles";
import { notoSans300, notoSans400, notoSans500, notoSans700 } from "./fonts";

// // <== Colors ==>
// // ### Neutral
// const darkBlue = "hsl(209, 23%, 22%)"; // (Dark Mode Elements)
// const veryDarkBlueDMBG = "hsl(207, 26%, 17%)"; // (Dark Mode Background)
// const veryDarkBlueLMT = "hsl(200, 15%, 8%)"; // (Light Mode Text)
// const darkGray = "hsl(0, 0%, 52%)"; // (Light Mode Input)
// const veryLightGray = "hsl(0, 0%, 98%)"; // (Light Mode Background)
// const white = "hsl(0, 0%, 100%)"; // (Dark Mode Text & Light Mode Elements)

const customizedTheme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  },
  typography: {
    fontFamily: "Noto Sans HK, Roboto, Helvetica, Arial, sans-serif",
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": [notoSans300, notoSans400, notoSans500, notoSans700],
      },
    },
  },
});
// customizedTheme.typography.h1 = {
//   fontSize: "1.35rem",
//   fontWeight: "800",
//   [customizedTheme.breakpoints.up("md")]: {
//     fontSize: "1.35rem",
//   },
// };

export default customizedTheme;
