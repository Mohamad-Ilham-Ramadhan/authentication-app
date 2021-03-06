import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    color: theme.palette.neutral.lightGray,
    padding: [16, 18],
    [theme.breakpoints.up("md")]: {
      padding: [16, 0],
    },
    "& p": {
      fontSize: 13,
    },
  },
}));

export default function Footer({ className }) {
  const styles = useStyles();

  return (
    <footer className={clsx(styles.root, className)}>
      <Typography>Mohamad Ilham Ramadhan</Typography>
      <Typography>devchallenges.io</Typography>
    </footer>
  );
}
