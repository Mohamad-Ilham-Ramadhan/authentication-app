import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {},
  header: {
    marginBottom: 24,
    [theme.breakpoints.up("md")]: {
      marginBottom: 42,
    },
  },
  heading: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 8,
    fontWeight: 400,
    [theme.breakpoints.up("md")]: {
      fontSize: 36,
    },
  },
  subheading: {
    textAlign: "center",
    marginBottom: 40,
    [theme.breakpoints.up("md")]: {
      fontSize: 18,
    },
  },
  wrapperTable: {
    paddingRight: 0,
    paddingLeft: 0,
    [theme.breakpoints.down("sm")]: {
      maxWidth: "unset",
    },
    [theme.breakpoints.up("md")]: {
      paddingRight: 24,
      paddingLeft: 24,
    },
  },
  table: {
    [theme.breakpoints.up("md")]: {
      border: "1px solid #e0e0e0",
      borderRadius: 12,
    },
    marginBottom: 32,
  },
  tableHeading: {
    fontSize: 24,
  },
  tableSubheading: {
    fontSize: 13,
    color: theme.palette.neutral.gray,
  },
  edit: {
    borderRadius: 12,
    border: `1px solid ${theme.palette.neutral.gray}`,
    color: theme.palette.neutral.gray,
    padding: [6, 33],
  },
  gridPadding: {
    padding: 16,
    [theme.breakpoints.up("md")]: {
      padding: 32,
    },
  },
  gridContainerHeading: {
    [theme.breakpoints.up("md")]: {
      borderBottom: `1px solid #e0e0e0`,
    },
  },
  gridHeading: {
    extend: "gridPadding",
  },
  gridEdit: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    extend: "gridPadding",
  },
  gridContainer: {
    borderBottom: `1px solid #e0e0e0`,
    [theme.breakpoints.up("md")]: {
      "&:last-child": {
        borderBottom: "none",
      },
    },
  },
  gridKey: {
    fontSize: 13,
    textTransform: "uppercase",
    color: theme.palette.neutral.lightGray,
    display: "flex",
    alignItems: "center",
    extend: "gridPadding",
  },
  gridValue: {
    fontSize: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    textAlign: "right",
    fontWeight: 500,
    extend: "gridPadding",
    [theme.breakpoints.up("md")]: {
      justifyContent: "flex-start",
      textAlign: "left",
    },
    "& img": {
      width: 72,
      height: 72,
      borderRadius: 8,
      objectFit: "cover",
    },
    "&.bio": {
      "& div": {
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
      },
    },
    "&.email": {
      wordBreak: "break-all",
    },
  },
  defaultPhoto: {
    width: 72,
    height: 72,
    borderRadius: 8,
    backgroundColor: theme.palette.neutral.lightGray,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    "& svg": {
      width: "inherit",
      height: "inherit",
      color: "white",
    },
  },
}));

export default useStyles;
