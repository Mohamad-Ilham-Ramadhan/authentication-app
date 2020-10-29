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
  },
  heading: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 8,
    fontWeight: 400,
  },
  subheading: {
    textAlign: "center",
    marginBottom: 40,
  },
  table: {
    tableLayout: "fixed",
    "& th": {
      borderBottom: "none",
    },
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

  gridHeading: {
    padding: 16,
  },
  gridEdit: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 16,
  },
  gridContainer: {
    borderBottom: `1px solid #e0e0e0`,
  },
  gridKey: {
    fontSize: 13,
    textTransform: "uppercase",
    color: theme.palette.neutral.lightGray,
    display: "flex",
    alignItems: "center",
    padding: 16,
  },
  gridValue: {
    fontSize: 16,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    textAlign: "right",
    fontWeight: 500,
    padding: 16,
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
      <Grid container>
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
          <div>Hello, I'm frontend web developer and also a handsome guy.</div>
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
      <Footer />
    </section>
  );
}
