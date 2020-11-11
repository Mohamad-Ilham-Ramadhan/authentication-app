import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import firebase from "../../config/firebase";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import GoogleIcon from "../../assets/images/Google.svg";
import FacebookIcon from "../../assets/images/Facebook.svg";
import GithubIcon from "../../assets/images/Github.svg";
import TwitterIcon from "../../assets/images/Twitter.svg";
import logo from "../../assets/images/logo.svg";
import Footer from "../Footer";
import Input from "../form/Input";
// style
import useStyles from "./style";
// actions
import login from "../../config/redux/actions/login";
import signInWithProvider from "../../config/redux/actions/signInWithProvider";

function Login({
  isLogin,
  uid,
  loading,
  errorMessage,
  login,
  signInWithProvider,
}) {
  const styles = useStyles();
  const [values, setValues] = useState({ email: "", password: "" });
  const history = useHistory();
  function handleChange(e) {
    setValues((values) => ({ ...values, [e.target.id]: e.target.value }));
  }
  useEffect(() => {
    if (isLogin) {
      console.log("push back!");
      history.push(`/profile/${uid}`);
    }
  }, [isLogin, uid]);
  function handleLogin() {
    login(values);
  }
  function handleLoginWithProvider(provider) {
    return function () {
      signInWithProvider(provider);
    };
  }
  return (
    <section className={styles.root}>
      <Container className={styles.container}>
        <img className={styles.logo} src={logo} />
        <Typography className={styles.heading} component="h1">
          Login
        </Typography>
        <div className={styles.form}>
          <Input
            className={styles.email}
            type="email"
            placeholder="Email"
            id="email"
            value={values.email}
            onChange={handleChange}
            icon={<EmailIcon />}
            disabled={loading}
          />
          <p className={styles.errMsg}>{errorMessage}</p>
          <Input
            className={styles.password}
            type="password"
            placeholder="Password"
            id="password"
            value={values.password}
            onChange={handleChange}
            icon={<LockIcon />}
            disabled={loading}
          />

          <Button
            variant="contained"
            color="primary"
            className={styles.submit}
            fullWidth
            disableElevation
            onClick={handleLogin}
          >
            {loading ? (
              <CircularProgress
                size={27.3}
                className={styles.circularProgress}
              />
            ) : (
              "Login"
            )}
          </Button>
        </div>
        <div className={styles.sosmed}>
          <Typography className={styles.sosmedText}>
            or continue with these social profile
          </Typography>
          <div className={styles.sosmedWrapperImg}>
            <IconButton
              className={styles.sosmedIcon}
              component="span"
              onClick={handleLoginWithProvider("google")}
            >
              <img src={GoogleIcon} alt="" />
            </IconButton>
            <IconButton
              className={styles.sosmedIcon}
              component="span"
              onClick={handleLoginWithProvider("facebook")}
            >
              <img src={FacebookIcon} alt="" />
            </IconButton>
            <IconButton
              className={styles.sosmedIcon}
              component="span"
              onClick={handleLoginWithProvider("twitter")}
            >
              <img src={TwitterIcon} alt="" />
            </IconButton>
            <IconButton
              className={styles.sosmedIcon}
              component="span"
              onClick={handleLoginWithProvider("github")}
            >
              <img src={GithubIcon} alt="" />
            </IconButton>
          </div>
          <Typography className={styles.sosmedText}>
            Don't have an account yet? <Link to="/register">Register</Link>
          </Typography>
        </div>
      </Container>
      <Footer />
    </section>
  );
}
function mapState(state) {
  return {
    errorMessage: state.messages.login,
    loading: state.loadings.login,
    isLogin: state.auth.login,
    uid: state.user.uid,
  };
}
function mapDispatch(dispatch) {
  return {
    login: (credentials) => dispatch(login(credentials)),
    signInWithProvider: (provider) => dispatch(signInWithProvider(provider)),
  };
}
export default connect(mapState, mapDispatch)(Login);
