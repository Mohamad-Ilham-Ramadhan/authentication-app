import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Header from "../Header";
import Footer from "../Footer";
import profileImg from "../../assets/images/profile.jpg";
import profileImg2 from "../../assets/images/profile2.jpeg";
import PersonIcon from "@material-ui/icons/Person";
import firebase, { database } from "../../config/firebase";
// style
import useStyles from "./style";
// action

function Profile({ user, isLogin }) {
  const styles = useStyles();
  const history = useHistory();
  let usedUser = {};
  // useEffect(() => {
  //   console.log("User =>", user);
  if (!user.uid) {
    // firebase.auth
    usedUser = {
      // photoUrl: "asdfasdf.jpg",
      displayName: "Ilham Dragunov",
      bio: "Dragon Slayer",
      phoneNumber: "082246796965",
      email: "ilhamdragun@gmail.com",
      providerId: "google.com",
    };
  } else {
    usedUser = user;
  }
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
              {isLogin && (
                <Button
                  variant="outlined"
                  className={styles.edit}
                  onClick={handleClickEdit}
                >
                  Edit
                </Button>
              )}
            </Grid>
          </Grid>
          <Grid container className={styles.gridContainer}>
            <Grid item xs={4} className={styles.gridKey}>
              Photo
            </Grid>
            <Grid item xs={8} className={styles.gridValue}>
              {usedUser.photoUrl ? (
                <img src={usedUser.photoUrl} alt="" />
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
              {usedUser.displayName ? usedUser.displayName : "-"}
            </Grid>
          </Grid>
          <Grid container className={styles.gridContainer}>
            <Grid item xs={4} className={styles.gridKey}>
              Bio
            </Grid>
            <Grid item xs={8} className={clsx(styles.gridValue, "bio")}>
              <div>{usedUser.bio ? usedUser.bio : "-"}</div>
            </Grid>
          </Grid>
          <Grid container className={styles.gridContainer}>
            <Grid item xs={4} className={styles.gridKey}>
              Phone
            </Grid>
            <Grid item xs={8} className={clsx(styles.gridValue, "bio")}>
              <div>{usedUser.phoneNumber ? usedUser.phoneNumber : "-"}</div>
            </Grid>
          </Grid>
          <Grid container className={styles.gridContainer}>
            <Grid item xs={4} className={styles.gridKey}>
              Email
            </Grid>
            <Grid item xs={8} className={clsx(styles.gridValue, "email")}>
              {usedUser.email ? usedUser.email : "-"}
            </Grid>
          </Grid>
          <Grid container className={styles.gridContainer}>
            <Grid item xs={4} className={styles.gridKey}>
              Password
            </Grid>
            <Grid item xs={8} className={styles.gridValue}>
              {usedUser.providerId == "password" ? "**********" : "-"}
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
