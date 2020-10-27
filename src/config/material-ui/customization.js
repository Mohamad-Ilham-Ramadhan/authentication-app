import { createMuiTheme, lighten } from "@material-ui/core/styles";
import {
  notoSans300,
  notoSans400,
  notoSans500,
  notoSans700,
  notoSansOri,
} from "./fonts";

// <== Colors ==>
// ### Primary
const primary = "#2F80ED";
const secondary = "#EB5757";
// ### Neutral
const whiteBg = "#FAFAFB";
const gray = "#828282";
const lightGray = "#BDBDBD";
const darkGray = "#333333";

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
  palette: {
    primary: {
      main: primary,
    },
    secondary: {
      main: secondary,
    },
    neutral: {
      white: whiteBg,
      gray,
      lightGray,
      darkGray,
    },
  },
  typography: {
    fontFamily: "Noto Sans HK, Roboto, Helvetica, Arial, sans-serif",
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": [
          notoSans300,
          notoSans400,
          notoSans500,
          notoSans700,
          notoSansOri,
        ],
        ".MuiButton-root": {
          textTransform: "none !important",
          color: "white",
        },
        ".MuiInputBase-input[type='password']": {
          fontFamily: "Noto Sans",
        },
        a: {
          color: "#2d9cdb",
          textDecoration: "none",
          "&:hover": {
            textDecoration: "underline",
          },
        },
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
