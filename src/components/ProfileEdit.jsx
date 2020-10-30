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
  wrapperForm: {
    marginBottom: 32,
    [theme.breakpoints.up("md")]: {
      border: "1px solid #e0e0e0",
      borderRadius: 12,
      padding: [32, 48],
    },
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
    maxWidth: 420,
    [theme.breakpoints.up("md")]: {},
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
    "&.url": {
      maxWidth: "unset",
    },
  },
  photo: {
    extend: "input",
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
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
    "& .wrapper": {
      flex: 1,
      overflow: "hidden",
    },
    "& .label": {
      textTransform: "uppercase",
      fontSize: 13,
      fontWeight: 500,
      color: theme.palette.neutral.gray,
    },
    "& .filename": {
      width: "100%",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
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
      left: 0,
      top: 0,
      height: "100%",
      width: "100%",
      opacity: 0,
    },
  },
  dialogUrl: {
    "& .MuiDialog-paper": {
      padding: [24, 16],
    },
  },
  done: {
    borderRadius: 8,
  },
}));

export default function ProfileEdit() {
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const [openUrl, setOpenUrl] = useState(false);
  const [url, setUrl] = useState(null);
  const fileRef = useRef(null);
  const [filename, setFilename] = useState(null);
  // input values:
  const [values, setValues] = useState({
    url: "",
    name: "",
    bio: "",
    phone: "",
    email: "",
    password: "",
  });
  function handleChange(e) {
    setValues((prevValues) => ({
      ...prevValues,
      [e.target.id]: e.target.value,
    }));
  }
  function handleClickPhoto() {
    setOpen(true);
  }
  function handleCloseDrawer() {
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
  function handleClickDoneUrl() {
    setOpenUrl(false);
    setFilename(values.url);
  }
  return (
    <section>
      <Dialog
        className={styles.dialogUrl}
        open={openUrl}
        onClose={handleCloseUrl}
        fullWidth
      >
        <Input
          label="Photo URL"
          type="text"
          id="url"
          value={values.url}
          onChange={handleChange}
          placeholder="Enter your photo URL..."
          className={clsx(styles.input, "url")}
        />
        <Button
          variant="contained"
          color="primary"
          className={styles.done}
          disableElevation
          fullWidth
          onClick={handleClickDoneUrl}
        >
          Done
        </Button>
      </Dialog>
      <Header className={styles.header} />
      <Container>
        <Link className={styles.back}>
          <ArrowBackIcon fontSize="small" />
          Back
        </Link>
        <div className={styles.wrapperForm}>
          <Typography component="h1" className={styles.heading}>
            Change Info
          </Typography>
          <Typography className={styles.subheading}>
            Changes will be reflected to every services
          </Typography>
          <div className={styles.photo}>
            <ButtonBase onClick={handleClickPhoto}>
              <CameraAltIcon />
            </ButtonBase>
            <div className="wrapper">
              <div className="label">change photo</div>
              <div className="filename">{filename}</div>
            </div>
            <SwipeableDrawer
              className={styles.drawer}
              anchor="bottom"
              open={open}
              onClose={handleCloseDrawer}
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
          <div>
            <Input
              label="Name"
              type="text"
              id="name"
              value={values.name}
              onChange={handleChange}
              placeholder="Enter your name..."
              className={styles.input}
            />
          </div>
          <div>
            <Input
              label="Bio"
              id="bio"
              value={values.bio}
              onChange={handleChange}
              placeholder="Enter your bio..."
              className={styles.input}
              multiline
              rows={3}
            />
          </div>
          <div>
            <Input
              label="Phone"
              id="phone"
              value={values.phone}
              onChange={handleChange}
              placeholder="Enter your phone..."
              className={styles.input}
              type="number"
            />
          </div>
          <div>
            <Input
              label="Email"
              id="email"
              value={values.email}
              onChange={handleChange}
              placeholder="Enter your email..."
              className={styles.input}
              type="email"
            />
          </div>
          <div>
            <Input
              label="Password"
              id="password"
              value={values.password}
              onChange={handleChange}
              placeholder="Enter your new password..."
              className={styles.input}
              type="password"
            />
          </div>
          <div>
            <Button
              variant="contained"
              color="primary"
              className={styles.save}
              disableElevation
            >
              Save
            </Button>
          </div>
        </div>
        <Footer className={styles.footer} />
      </Container>
    </section>
  );
}
