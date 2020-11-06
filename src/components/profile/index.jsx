import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
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
import Header from "../Header";
import Footer from "../Footer";
import profileImg from "../../assets/images/profile.jpg";
import profileImg2 from "../../assets/images/profile2.jpeg";
import PersonIcon from "@material-ui/icons/Person";

// style
import useStyles from "./style";
// action

// flow register
// 1. firebase signin
// 2. store user in redux
// -. kalo isNewUser save data provider di database, kalo tidak maka tidak di save.
// 3. use user in redux for <Profile />

// flow login
// 1. firebase  signin
// 2. fetch data user di firebase database
// 3. store data user di redux
// 4. gunakan data user di <Profile />

function Profile({ user, isLogin }) {
  const styles = useStyles();
  const history = useHistory();
  function handleClickEdit() {
    history.push(`/profile/${user.uid}/edit`);
  }
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
              <Button
                variant="outlined"
                className={styles.edit}
                onClick={handleClickEdit}
              >
                Edit
              </Button>
            </Grid>
          </Grid>
          <Grid container className={styles.gridContainer}>
            <Grid item xs={4} className={styles.gridKey}>
              Photo
            </Grid>
            <Grid item xs={8} className={styles.gridValue}>
              {user.photoUrl ? (
                <img src={user.photoUrl} alt="" />
              ) : (
                <div className={styles.defaultPhoto}>
                  <PersonIcon />
                </div>
              )}
            </Grid>
          </Grid>
          <Grid container className={styles.gridContainer}>
            <Grid item xs={4} className={styles.gridKey}>
              Name
            </Grid>
            <Grid item xs={8} className={styles.gridValue}>
              {user.displayName ? user.displayName : "-"}
            </Grid>
          </Grid>
          <Grid container className={styles.gridContainer}>
            <Grid item xs={4} className={styles.gridKey}>
              Bio
            </Grid>
            <Grid item xs={8} className={clsx(styles.gridValue, "bio")}>
              <div>{user.bio ? user.bio : "-"}</div>
            </Grid>
          </Grid>
          <Grid container className={styles.gridContainer}>
            <Grid item xs={4} className={styles.gridKey}>
              Phone
            </Grid>
            <Grid item xs={8} className={clsx(styles.gridValue, "bio")}>
              <div>{user.phoneNumber ? user.phoneNumber : "-"}</div>
            </Grid>
          </Grid>
          <Grid container className={styles.gridContainer}>
            <Grid item xs={4} className={styles.gridKey}>
              Email
            </Grid>
            <Grid item xs={8} className={clsx(styles.gridValue, "email")}>
              {user.email ? user.email : "-"}
            </Grid>
          </Grid>
          <Grid container className={styles.gridContainer}>
            <Grid item xs={4} className={styles.gridKey}>
              Password
            </Grid>
            <Grid item xs={8} className={styles.gridValue}>
              {user.providerId == "password" ? "**********" : "-"}
            </Grid>
          </Grid>
        </div>
        <Footer />
      </Container>
    </section>
  );
}

function mapState(state) {
  return {
    isLogin: state.auth.login,
    user: state.user,
  };
}
export default connect(mapState)(Profile);
