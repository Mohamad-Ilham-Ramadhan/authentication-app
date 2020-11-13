import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import clsx from "clsx";
import { Link, useHistory } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import LoadingBlock from "../LoadingBlock";
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
// actions
import updateUser from "../../config/redux/actions/updateUser";

function ProfileEdit({ user, updateUser, isLogin, isAuthenticating, errMsgs }) {
  console.log("Error messages:", errMsgs);
  const styles = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [openUrl, setOpenUrl] = useState(false);
  const fileRef = useRef(null);
  const [filename, setFilename] = useState(null);
  // input values:
  const [values, setValues] = useState({
    url: "",
    displayName: user.displayName,
    bio: user.bio,
    phoneNumber: user.phoneNumber,
    email: user.email,
    password: "",
  });
  useEffect(() => {
    console.log("user =>", user);
    setValues({
      ...values,
      displayName: user.displayName,
      bio: user.bio,
      phoneNumber: user.phoneNumber,
      email: user.email,
    });
  }, [user]);
  function handleChange(e) {
    setValues((prevValues) => ({
      ...prevValues,
      [e.target.id]: e.target.value,
    }));
  }
  function handleClickBack() {
    history.goBack();
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
  function handleSubmit(values, e) {
    updateUser(values);
    e.preventDefault();
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
        <Link className={styles.back} onClick={handleClickBack}>
          <ArrowBackIcon fontSize="small" />
          Back
        </Link>
        <form
          className={styles.wrapperForm}
          onSubmit={(e) => handleSubmit(values, e)}
        >
          {isAuthenticating ? (
            <>
              <LoadingBlock className={styles.loadingBlock} />
              <LoadingBlock className={styles.loadingBlock} />
              <LoadingBlock className={styles.loadingBlock} />
            </>
          ) : (
            <>
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
                      <ListItemText onClick={handleClickUrl}>
                        Add URL
                      </ListItemText>
                    </ListItem>
                  </List>
                </SwipeableDrawer>
              </div>
              <div>
                <Input
                  label="Name"
                  type="text"
                  id="displayName"
                  value={values.displayName}
                  onChange={handleChange}
                  placeholder="Enter your name..."
                  className={styles.input}
                />
                <p className={styles.errMsg}>{errMsgs.displayName}</p>
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
                <p className={styles.errMsg}>{errMsgs.bio}</p>
              </div>
              <div>
                <Input
                  label="Phone"
                  id="phoneNumber"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter your phone..."
                  className={styles.input}
                  type="number"
                />
                <p className={styles.errMsg}>{errMsgs.phoneNumber}</p>
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
                <p className={styles.errMsg}>{errMsgs.email}</p>
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
                <p className={styles.errMsg}>{errMsgs.password}</p>
              </div>
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  className={styles.save}
                  disableElevation
                  type="submit"
                >
                  Save
                </Button>
              </div>
            </>
          )}
        </form>
        <Footer className={styles.footer} />
      </Container>
    </section>
  );
}
function mapState(state) {
  return {
    user: state.user,
    isLogin: state.auth.login,
    isAuthenticating: state.auth.authenticating,
    errMsgs: state.messages.profileEdit,
  };
}
function mapDispatch(dispatch) {
  return {
    updateUser: (data) => dispatch(updateUser(data)),
  };
}
export default connect(mapState, mapDispatch)(ProfileEdit);
