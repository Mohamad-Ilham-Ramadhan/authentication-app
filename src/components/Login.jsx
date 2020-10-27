import React, { useState } from "react";
import firebase from "../config/firebase";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
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
const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 16,
    paddingRight: 18,
    paddingLeft: 18,
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
  input: {
    "& .MuiInputBase-root": {
      borderRadius: 8,
      height: 48,
    },
    "& .MuiInputBase-input": {
      "&::placeholder": {
        fontSize: 16,
      },
    },
    "& .Mui-focused": {
      "& fieldset": {
        borderColor: `${theme.palette.primary.main} !important`,
      },
    },
    "& fieldset": {
      borderColor: theme.palette.neutral.gray,
    },
    "& svg": {
      color: theme.palette.neutral.gray,
    },
  },
  email: {
    extend: "input",
    marginBottom: 16,
  },
  password: {
    extend: "input",
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

  return (
    <Container className={styles.root}>
      <img className={styles.logo} src={logo} />
      <Typography className={styles.heading} component="h1">
        Join thousands of learners from around the world
      </Typography>
      <Typography className={styles.subheading}>
        Master web development by making real-life projects. There are multiple
        paths for you to choose
      </Typography>
      <div className={styles.form}>
        <FormControl fullWidth className={styles.email} variant="outlined">
          <OutlinedInput
            placeholder="Email"
            // value={values.amount}
            // onChange={handleChange('amount')}
            startAdornment={
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl fullWidth className={styles.password} variant="outlined">
          <OutlinedInput
            placeholder="Password"
            // value={values.amount}
            // onChange={handleChange('amount')}
            startAdornment={
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            }
          />
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          className={styles.submit}
          fullWidth
          disableElevation
        >
          Register now
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
          Already a member? <Link to="/login">Login</Link>
        </Typography>
      </div>
      <Footer />
    </Container>
  );
}
