import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Header from "./Header";
import Footer from "./Footer";
import profileImg from "../assets/images/profile.jpg";
import profileImg2 from "../assets/images/profile2.jpeg";

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
  wrapperTable: {},
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
}));

export default function Profile() {
  const styles = useStyles();

  return (
    <section className={styles.root}>
      <Header className={styles.header} />
      <Container>
        <Typography className={styles.heading} variant="h1">
          Personal info
        </Typography>
        <Typography className={styles.subheading} variant="body2">
          Basic info, like your name and photo
        </Typography>
      </Container>
      <Container fixed className={styles.wrapperTable}>
        <div className={styles.table}>
          <Grid container className={styles.gridContainerHeading}>
            <Grid item xs={7} className={styles.gridHeading}>
              <Typography className={styles.tableHeading} component="h2">
                Profile
              </Typography>
              <Typography className={styles.tableSubheading}>
                Some info may be visible to other people.
              </Typography>
            </Grid>
            <Grid item xs={5} className={styles.gridEdit}>
              <Button variant="outlined" className={styles.edit}>
                Edit
              </Button>
            </Grid>
          </Grid>
          <Grid container className={styles.gridContainer}>
            <Grid item xs={4} className={styles.gridKey}>
              Photo
            </Grid>
            <Grid item xs={8} className={styles.gridValue}>
              <img src={profileImg2} alt="" />
            </Grid>
          </Grid>
          <Grid container className={styles.gridContainer}>
            <Grid item xs={4} className={styles.gridKey}>
              Name
            </Grid>
            <Grid item xs={8} className={styles.gridValue}>
              Mohamad Ilham Ramadhan
            </Grid>
          </Grid>
          <Grid container className={styles.gridContainer}>
            <Grid item xs={4} className={styles.gridKey}>
              Bio
            </Grid>
            <Grid item xs={8} className={clsx(styles.gridValue, "bio")}>
              <div>
                Hello, I'm frontend web developer and also a handsome guy.
              </div>
            </Grid>
          </Grid>
          <Grid container className={styles.gridContainer}>
            <Grid item xs={4} className={styles.gridKey}>
              Email
            </Grid>
            <Grid item xs={8} className={clsx(styles.gridValue, "email")}>
              mohamadilhamramadhan@gmail.com
            </Grid>
          </Grid>
          <Grid container className={styles.gridContainer}>
            <Grid item xs={4} className={styles.gridKey}>
              Password
            </Grid>
            <Grid item xs={8} className={styles.gridValue}>
              *************
            </Grid>
          </Grid>
        </div>
        <Footer />
      </Container>
    </section>
  );
}
