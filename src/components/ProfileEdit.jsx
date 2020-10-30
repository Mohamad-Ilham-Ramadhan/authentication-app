import React, { useState, useRef } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./Header";
import Footer from "./Footer";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Input from "./form/Input";
import ArrowBackIcon from "@material-ui/icons/ArrowBackIos";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import LinkIcon from "@material-ui/icons/Link";
import PhotoIcon from "@material-ui/icons/Photo";

const useStyles = makeStyles((theme) => ({
  root: {},
  header: {
    marginBottom: 24,
  },
  back: {
    display: "inline-flex",
    alignItems: "center",
    fontSize: 16,
    marginBottom: 24,
  },
  wrapper: {
    marginBottom: 32,
  },
  heading: {
    fontSize: 24,
  },
  subheading: {
    fontSize: 13,
    fontWeight: 500,
    color: theme.palette.neutral.gray,
    marginBottom: 24,
  },
  input: {
    marginBottom: 24,
    "& .MuiInputBase-root": {
      borderRadius: 12,
    },
    "& label": {
      fontSize: 13,
      fontWeight: 500,
      marginBottom: 4,
    },
    "& input": {
      fontSize: 13,
      fontWeight: 500,
      "&::placeholder": {
        fontSize: 13,
      },
    },
  },
  photo: {
    extend: "input",
    "& button": {
      width: 72,
      height: 72,
      background: "rgba(0,0,0,.2)",
      borderRadius: 8,
      marginRight: 24,
    },
    "& svg": {
      color: "white",
    },
    "& span": {
      textTransform: "uppercase",
      fontSize: 13,
      fontWeight: 500,
      color: theme.palette.neutral.gray,
    },
  },
  save: {
    borderRadius: 8,
    width: 82,
  },
  footer: {
    paddingRight: 0,
    paddingLeft: 0,
  },
  drawer: {
    "& .MuiDrawer-paper": {
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
    },
    "& .MuiListItem-root.file": {
      position: "relative",
    },
    "& .MuiListItemText-primary": {
      fontSize: 14,
      fontWeight: 500,
    },
    "& input[type='file']": {
      position: "absolute",
      height: "100%",
      width: "100%",
      opacity: 0,
    },
  },
}));

export default function ProfileEdit() {
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const [openUrl, setOpenUrl] = useState(false);
  const [url, setUrl] = useState(null);
  const fileRef = useRef(null);
  function handleClick() {
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  }
  function handleFileChange(e) {
    console.log("e.target => ", e.target);
    console.log("ref =>", fileRef.current);
    console.log("the files =>", fileRef.current.files[0]);
    setOpen(false);
  }
  function handleClickUrl() {
    setOpen(false);
    setOpenUrl(true);
  }
  function handleCloseUrl() {
    setOpenUrl(false);
  }
  return (
    <section>
      <Dialog open={openUrl} onClose={handleCloseUrl}>
        Give me your URL or I will pantek you!
      </Dialog>
      <Header className={styles.header} />
      <Container>
        <Link className={styles.back}>
          <ArrowBackIcon fontSize="small" />
          Back
        </Link>
        <div className={styles.wrapper}>
          <Typography component="h1" className={styles.heading}>
            Change Info
          </Typography>
          <Typography className={styles.subheading}>
            Changes will be reflected to every services
          </Typography>
          <div className={styles.photo}>
            <ButtonBase onClick={handleClick}>
              <CameraAltIcon />
            </ButtonBase>
            <span>change photo</span>
            <SwipeableDrawer
              className={styles.drawer}
              anchor="bottom"
              open={open}
              onClose={handleClose}
            >
              <List aria-label="upload photo add url">
                <ListItem button className="file">
                  <ListItemIcon>
                    <PhotoIcon />
                  </ListItemIcon>
                  <ListItemText>Upload photo</ListItemText>
                  <input
                    type="file"
                    ref={fileRef}
                    onChange={handleFileChange}
                  />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <LinkIcon />
                  </ListItemIcon>
                  <ListItemText onClick={handleClickUrl}>Add URL</ListItemText>
                </ListItem>
              </List>
            </SwipeableDrawer>
          </div>
          <Input
            label="Name"
            type="text"
            id="name"
            placeholder="Enter your name..."
            className={styles.input}
          />
          <Input
            label="Bio"
            id="bio"
            placeholder="Enter your bio..."
            className={styles.input}
            multiline
            rows={3}
          />
          <Input
            label="Phone"
            id="phone"
            placeholder="Enter your phone..."
            className={styles.input}
            type="number"
          />
          <Input
            label="Email"
            id="email"
            placeholder="Enter your email..."
            className={styles.input}
            type="email"
          />
          <Input
            label="Password"
            id="password"
            placeholder="Enter your new password..."
            className={styles.input}
            type="password"
          />
          <Button
            variant="contained"
            color="primary"
            className={styles.save}
            disableElevation
          >
            Save
          </Button>
        </div>
        <Footer className={styles.footer} />
      </Container>
    </section>
  );
}
