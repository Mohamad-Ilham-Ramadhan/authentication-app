import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {},
  header: {
    marginBottom: 24,
  },
  back: {
    display: "inline-flex",
    alignItems: "center",
    fontSize: 16,
    marginBottom: 24,
  },
  wrapperForm: {
    marginBottom: 32,
    [theme.breakpoints.up("md")]: {
      border: "1px solid #e0e0e0",
      borderRadius: 12,
      padding: [32, 48],
    },
  },
  heading: {
    fontSize: 24,
  },
  subheading: {
    fontSize: 13,
    fontWeight: 500,
    color: theme.palette.neutral.gray,
    marginBottom: 24,
  },
  input: {
    maxWidth: 420,
    [theme.breakpoints.up("md")]: {},
    "& .MuiInputBase-root": {
      borderRadius: 12,
    },
    "& label": {
      fontSize: 13,
      fontWeight: 500,
      marginBottom: 4,
    },
    "& input": {
      fontSize: 13,
      fontWeight: 500,
      "&::placeholder": {
        fontSize: 13,
      },
    },
    "&.url": {
      maxWidth: "unset",
      marginBottom: 24,
    },
  },
  photo: {
    extend: "input",
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 24,
    "& button": {
      width: 72,
      height: 72,
      background: "rgba(0,0,0,.2)",
      borderRadius: 8,
      marginRight: 24,
    },
    "& svg": {
      color: "white",
    },
    "& .wrapper": {
      flex: 1,
      overflow: "hidden",
    },
    "& .label": {
      textTransform: "uppercase",
      fontSize: 13,
      fontWeight: 500,
      color: theme.palette.neutral.gray,
    },
    "& .filename": {
      width: "100%",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    },
  },
  btnPhoto: {
    position: 'relative',
    overflow: 'hidden',
  },
  photoBG: {
    position: 'absolute',
    zIndex: -1,
    width: '100%',
  },
  save: {
    borderRadius: 8,
    width: 82,
    marginRight: 8,
  },
  footer: {
    paddingRight: 0,
    paddingLeft: 0,
  },
  drawer: {
    "& .MuiDrawer-paper": {
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
    },
    "& .MuiListItem-root.file": {
      position: "relative",
    },
    "& .MuiListItemText-primary": {
      fontSize: 14,
      fontWeight: 500,
    },
    "& input[type='file']": {
      position: "absolute",
      left: 0,
      top: 0,
      height: "100%",
      width: "100%",
      opacity: 0,
      cursor: 'pointer',
    },
  },
  dialogUrl: {
    "& .MuiDialog-paper": {
      padding: [24, 16],
    },
  },
  done: {
    borderRadius: 8,
  },
  loadingBlock: {
    height: 150,
    marginBottom: 40,
  },
  errMsg: {
    color: theme.palette.secondary.main,
    fontSize: 10,
    fontWeight: 700,
    marginBottom: 24,
  },
  wrapperSubmit: {
    display: "flex",
    alignItems: "center",
  },
  loading: {
    color: "white",
  },
  submitMsg: {
    display: "inline-flex",
    color: theme.palette.neutral.lightGray,
    fontWeight: 500,
    "& .MuiSvgIcon-root": {
      marginRight: 4,
      color: theme.palette.success.main,
    },
  },
}));

export default useStyles;
