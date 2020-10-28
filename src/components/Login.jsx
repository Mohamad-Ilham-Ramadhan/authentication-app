import React, { useState } from "react";
import firebase from "../config/firebase";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import GoogleIcon from "../assets/images/Google.svg";
import FacebookIcon from "../assets/images/Facebook.svg";
import GithubIcon from "../assets/images/Github.svg";
import TwitterIcon from "../assets/images/Twitter.svg";
import logo from "../assets/images/logo.svg";
import Footer from "./Footer";
import Input from "./form/Input";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 474,
    marginRight: "auto",
    marginLeft: "auto",
    [theme.breakpoints.up("md")]: {
      paddingTop: 56,
      paddingBottom: 56,
    },
  },
  container: {
    paddingTop: 16,
    paddingRight: 18,
    paddingLeft: 18,
    [theme.breakpoints.up("md")]: {
      border: `1px solid ${theme.palette.neutral.lightGray}`,
      borderRadius: 24,
      paddingTop: 48,
      paddingRight: 56,
      paddingLeft: 56,
    },
  },
  logo: {
    marginBottom: 24,
  },
  heading: {
    fontSize: 18,
    fontWeight: 600,
    color: theme.palette.neutral.darkGray,
    marginBottom: 16,
  },
  subheading: {
    fontSize: 16,
    color: theme.palette.neutral.darkGray,
    marginBottom: 24,
  },
  form: {
    marginBottom: 32,
  },

  email: {
    marginBottom: 16,
  },
  password: {
    marginBottom: 24,
  },
  submit: {
    borderRadius: 8,
    fontSize: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  sosmed: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    color: theme.palette.neutral.gray,
    marginBottom: 80,
  },
  sosmedText: {
    fontSize: 14,
    "&:first-child": {
      marginBottom: 24,
    },
  },
  sosmedWrapperImg: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginBottom: 24,
  },
  sosmedIcon: {
    padding: 0,
    marginRight: 20,
    "&:last-child": {
      marginRight: 0,
    },
    "& img": {
      width: 42,
    },
  },
}));

export default function Register() {
  const styles = useStyles();
  const [values, setValues] = useState({ email: "", password: "" });
  function handleChange(input) {
    return function (e) {
      setValues((values) => ({ ...values, [input]: e.target.value }));
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
            icon={<EmailIcon />}
          />
          <Input
            className={styles.password}
            type="password"
            placeholder="Password"
            icon={<LockIcon />}
          />

          <Button
            variant="contained"
            color="primary"
            className={styles.submit}
            fullWidth
            disableElevation
          >
            Login
          </Button>
        </div>
        <div className={styles.sosmed}>
          <Typography className={styles.sosmedText}>
            or continue with these social profile
          </Typography>
          <div className={styles.sosmedWrapperImg}>
            <IconButton className={styles.sosmedIcon} component="span">
              <img src={GoogleIcon} alt="" />
            </IconButton>
            <IconButton className={styles.sosmedIcon} component="span">
              <img src={FacebookIcon} alt="" />
            </IconButton>
            <IconButton className={styles.sosmedIcon} component="span">
              <img src={TwitterIcon} alt="" />
            </IconButton>
            <IconButton className={styles.sosmedIcon} component="span">
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
