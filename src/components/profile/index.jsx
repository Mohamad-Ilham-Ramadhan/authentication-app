import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Header from "../Header";
import Footer from "../Footer";
import LoadingBlock from "../LoadingBlock";
import profileImg from "../../assets/images/profile.jpg";
import profileImg2 from "../../assets/images/profile2.jpeg";
import PersonIcon from "@material-ui/icons/Person";
import firebase, { database } from "../../config/firebase";
// style
import useStyles from "./style";
// action
import setLoadingUser from "../../config/redux/actions/setLoadingUser";
function Profile({ user, isLogin, loadingUser, setLoadingUser }) {
  const styles = useStyles();
  const history = useHistory();
  const { id: uid } = useParams();
  const [noUser, setNoUser] = useState(false);
  const [usedUser, setUsedUser] = useState({});
  const isEditable = uid == user.uid && isLogin;
  useEffect(() => {
    // kalo gak ada signed in user
    if (!user.uid) {
      // fetch user.
      setLoadingUser(true);
      database
        .ref(`users/${uid}`)
        .once("value")
        .then((snapshot) => {
          if (snapshot.val() == null) {
            throw new Error("There is no user found!");
          }
          const result = snapshot.val();
          setUsedUser(result);
          setLoadingUser(false);
        })
        .catch((err) => {
          setNoUser(true);
          setLoadingUser(false);
        });
      // kalo ada signed user
    } else {
      // kalo signed user beda dengan uid(params) fetch dari database
      if (user.uid !== uid) {
        setLoadingUser(true);
        database
          .ref(`users/${uid}`)
          .once("value")
          .then((snapshot) => {
            const result = snapshot.val();
            setUsedUser(result);
            setLoadingUser(false);
          });
      } else {
        // kalo signed user sama dengan uid(params) ambil dari redux
        setUsedUser(user);
        setLoadingUser(false);
      }
    }
  }, [uid]);
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
          {noUser ? (
            <Typography className={styles.noUser} variant="h2" align="center">
              There no user found.
            </Typography>
          ) : (
            <>
              <Grid container className={styles.gridContainerHeading}>
                <Grid item xs={7} className={styles.gridHeading}>
                  {loadingUser ? (
                    <LoadingBlock />
                  ) : (
                    <>
                      <Typography
                        className={styles.tableHeading}
                        component="h2"
                      >
                        Profile
                      </Typography>
                      <Typography className={styles.tableSubheading}>
                        Some info may be visible to other people.
                      </Typography>
                    </>
                  )}
                </Grid>
                <Grid item xs={5} className={styles.gridEdit}>
                  {loadingUser ? (
                    <LoadingBlock />
                  ) : (
                    isEditable && (
                      <Button
                        variant="outlined"
                        className={styles.edit}
                        onClick={handleClickEdit}
                      >
                        Edit
                      </Button>
                    )
                  )}
                </Grid>
              </Grid>
              <Grid container className={styles.gridContainer}>
                <Grid item xs={4} className={styles.gridKey}>
                  {loadingUser ? <LoadingBlock /> : "Photo"}
                </Grid>
                <Grid item xs={8} className={styles.gridValue}>
                  {loadingUser ? (
                    <LoadingBlock />
                  ) : usedUser.photoUrl ? (
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
                  {loadingUser ? <LoadingBlock /> : "Name"}
                </Grid>
                <Grid item xs={8} className={styles.gridValue}>
                  {loadingUser ? (
                    <LoadingBlock />
                  ) : usedUser.displayName ? (
                    usedUser.displayName
                  ) : (
                    "-"
                  )}
                </Grid>
              </Grid>
              <Grid container className={styles.gridContainer}>
                <Grid item xs={4} className={styles.gridKey}>
                  {loadingUser ? <LoadingBlock /> : "Bio"}
                </Grid>
                <Grid item xs={8} className={clsx(styles.gridValue, "bio")}>
                  {loadingUser ? (
                    <LoadingBlock />
                  ) : (
                    <div>{usedUser.bio ? usedUser.bio : "-"}</div>
                  )}
                </Grid>
              </Grid>
              <Grid container className={styles.gridContainer}>
                <Grid item xs={4} className={styles.gridKey}>
                  {loadingUser ? <LoadingBlock /> : "Phone"}
                </Grid>
                <Grid item xs={8} className={clsx(styles.gridValue, "bio")}>
                  {loadingUser ? (
                    <LoadingBlock />
                  ) : (
                    <div>
                      {usedUser.phoneNumber ? usedUser.phoneNumber : "-"}
                    </div>
                  )}
                </Grid>
              </Grid>
              <Grid container className={styles.gridContainer}>
                <Grid item xs={4} className={styles.gridKey}>
                  {loadingUser ? <LoadingBlock /> : "Email"}
                </Grid>
                <Grid item xs={8} className={clsx(styles.gridValue, "email")}>
                  {loadingUser ? (
                    <LoadingBlock />
                  ) : usedUser.email ? (
                    usedUser.email
                  ) : (
                    "-"
                  )}
                </Grid>
              </Grid>
              <Grid container className={styles.gridContainer}>
                <Grid item xs={4} className={styles.gridKey}>
                  {loadingUser ? <LoadingBlock /> : "Password"}
                </Grid>
                <Grid item xs={8} className={styles.gridValue}>
                  {loadingUser ? (
                    <LoadingBlock />
                  ) : usedUser.password ? (
                    "**********"
                  ) : (
                    "-"
                  )}
                </Grid>
              </Grid>
            </>
          )}
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
    loadingUser: state.loadings.user,
  };
}
function mapDispatch(dispatch) {
  return {
    setLoadingUser: (payload) => dispatch(setLoadingUser(payload)),
  };
}
export default connect(mapState, mapDispatch)(Profile);
