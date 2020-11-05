import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
// action
import login from "../../config/redux/actions/login";
import register from "../../config/redux/actions/register";
import signInWithProvider from "../../config/redux/actions/signInWithProvider";

function Register({
  isLogin,
  uid,
  errorMessage,
  loading,
  register,
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
      history.push(`/profile/${uid}`);
    }
  }, [isLogin]);
  function handleRegister() {
    register(values);
  }
  function handleRegisterWithProvider(provider) {
    return function () {
      signInWithProvider(provider, "register");
    };
  }
  return (
    <section className={styles.root}>
      <Container className={styles.container}>
        <img className={styles.logo} src={logo} />
        <Typography className={styles.heading} component="h1">
          Join thousands of learners from around the world
        </Typography>
        <Typography className={styles.subheading}>
          Master web development by making real-life projects. There are
          multiple paths for you to choose
        </Typography>
        <div className={styles.form}>
          <Input
            className={styles.email}
            type="email"
            id="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
            icon={<EmailIcon />}
            disabled={loading}
          />
          <p className={styles.errMsg}>{errorMessage}</p>
          <Input
            className={styles.password}
            type="password"
            id="password"
            placeholder="Password"
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
            onClick={handleRegister}
          >
            {loading ? (
              <CircularProgress
                size={27.3}
                className={styles.circularProgress}
              />
            ) : (
              "Register now"
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
              onClick={handleRegisterWithProvider("google")}
            >
              <img src={GoogleIcon} alt="" />
            </IconButton>
            <IconButton
              className={styles.sosmedIcon}
              component="span"
              onClick={handleRegisterWithProvider("facebook")}
            >
              <img src={FacebookIcon} alt="" />
            </IconButton>
            <IconButton
              className={styles.sosmedIcon}
              component="span"
              onClick={handleRegisterWithProvider("twitter")}
            >
              <img src={TwitterIcon} alt="" />
            </IconButton>
            <IconButton
              className={styles.sosmedIcon}
              component="span"
              onClick={handleRegisterWithProvider("github")}
            >
              <img src={GithubIcon} alt="" />
            </IconButton>
          </div>
          <Typography className={styles.sosmedText}>
            Already a member? <Link to="/login">Login</Link>
          </Typography>
        </div>
      </Container>
      <Footer />
    </section>
  );
}
function mapState(state) {
  return {
    errorMessage: state.messages.register,
    loading: state.loadings.register,
    isLogin: state.auth.login,
    uid: state.user.uid,
  };
}
function mapDispatch(dispatch) {
  return {
    register: (inputs) => dispatch(register(inputs)),
    signInWithProvider: (provider, method) =>
      dispatch(signInWithProvider(provider, method)),
  };
}

export default connect(mapState, mapDispatch)(Register);
