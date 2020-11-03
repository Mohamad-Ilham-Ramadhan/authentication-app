import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 474,
    marginRight: "auto",
    marginLeft: "auto",
    [theme.breakpoints.up("md")]: {
      paddingTop: 56,
      paddingBottom: 56,
    },
  },
  container: {
    paddingTop: 16,
    paddingRight: 18,
    paddingLeft: 18,
    [theme.breakpoints.up("md")]: {
      border: `1px solid ${theme.palette.neutral.lightGray}`,
      borderRadius: 24,
      paddingTop: 48,
      paddingRight: 56,
      paddingLeft: 56,
    },
  },
  logo: {
    marginBottom: 24,
  },
  heading: {
    fontSize: 18,
    fontWeight: 600,
    color: theme.palette.neutral.darkGray,
    marginBottom: 16,
  },
  subheading: {
    fontSize: 16,
    color: theme.palette.neutral.darkGray,
    marginBottom: 24,
  },
  form: {
    marginBottom: 32,
  },
  input: {
    "& .MuiInputBase-input": {
      padding: [14.5, 14],
    },
  },
  email: {
    extend: "input",
  },
  password: {
    extend: "input",
    marginBottom: 24,
  },
  submit: {
    borderRadius: 8,
    fontSize: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  sosmed: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    color: theme.palette.neutral.gray,
    marginBottom: 80,
  },
  sosmedText: {
    fontSize: 14,
    "&:first-child": {
      marginBottom: 24,
    },
  },
  sosmedWrapperImg: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginBottom: 24,
  },
  sosmedIcon: {
    padding: 0,
    marginRight: 20,
    "&:last-child": {
      marginRight: 0,
    },
    "& img": {
      width: 42,
    },
  },
  circularProgress: {
    color: "white",
  },
  errMsg: {
    color: theme.palette.secondary.main,
    fontSize: 10,
    fontWeight: 700,
    marginBottom: 16,
  },
}));

export default useStyles;
