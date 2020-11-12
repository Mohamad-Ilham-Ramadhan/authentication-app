import React from "react";
import clsx from "clsx";
import { makeStyles, lighten } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  "@keyframes loadingBlock": {
    from: {
      backgroundColor: lighten(theme.palette.neutral.lightGray, 0.9),
    },
    to: {
      backgroundColor: lighten(theme.palette.neutral.lightGray, 0.6),
    },
  },
  root: {
    backgroundColor: lighten(theme.palette.neutral.lightGray, 0.5),
    height: 60,
    width: "100%",
    borderRadius: 8,
    animation: "$loadingBlock 1s infinite alternate",
  },
}));

export default function LoadingBlock({ className }) {
  const styles = useStyles();
  return <div className={clsx(styles.root, className)}></div>;
}
