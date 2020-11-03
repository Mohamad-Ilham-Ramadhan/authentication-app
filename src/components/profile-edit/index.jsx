import React, { useState, useRef } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Header from "../Header";
import Footer from "../Footer";
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
import Input from "../form/Input";
import ArrowBackIcon from "@material-ui/icons/ArrowBackIos";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import LinkIcon from "@material-ui/icons/Link";
import PhotoIcon from "@material-ui/icons/Photo";
// style
import useStyles from "./style";

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
