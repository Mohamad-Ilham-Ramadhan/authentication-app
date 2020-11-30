import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import clsx from "clsx";
import { Link, useHistory, useParams } from "react-router-dom";
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
import CircularProgress from "@material-ui/core/CircularProgress";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
// style
import useStyles from "./style";
// actions
import updateUser from "../../config/redux/actions/updateUser";
import setLoadingProfileEdit from "../../config/redux/actions/setLoadingProfileEdit";
import setErrMsgProfileEdit from "../../config/redux/actions/setErrMsgProfileEdit";
import setLoadingUser from "../../config/redux/actions/setLoadingUser";
import { storage } from "../../config/firebase";
function ProfileEdit({
  user,
  updateUser,
  isLogin,
  isAuthenticating,
  errMsgs,
  loading,
  setLoadingProfileEdit,
  setErrMsgProfileEdit,
  setLoadingUser,
}) {
  // console.log(user);
  const styles = useStyles();
  const history = useHistory();
  const { uid } = useParams();
  const [open, setOpen] = useState(false);
  const [openUrl, setOpenUrl] = useState(false);
  const fileRef = useRef(null);
  const [file, setFile] = useState(null);
  const [notFound, setNotFound] = useState(false);
  // const [photo, setPhoto] = useState(null);
  const inputURLRef = useRef('asdf');
  const [photoImgSrc, setPhotoImgSrc] = useState('');
  // input values:
  const [values, setValues] = useState({
    displayName: user.displayName,
    bio: user.bio,
    phoneNumber: user.phoneNumber,
    email: user.email,
    password: "",
    file: null,
  });
  useEffect(() => {
    console.log("user =>", user);
    setPhotoImgSrc(user.photoURL)
    setValues({
      ...values,
      displayName: user.displayName,
      bio: user.bio,
      phoneNumber: user.phoneNumber,
      email: user.email,
    });
  }, [user]);
  // clean the messages when component unmount
  useEffect(() => {
    // jika gak ada user signed in
    if (!user.uid) {
      setLoadingUser(false);
    }
    return () => {
      setErrMsgProfileEdit({
        displayName: "",
        bio: "",
        phoneNumber: "",
        email: "",
        password: "",
        submit: "",
      });
    };
  }, []);
  useEffect(() => {
    if (user.uid !== uid) {
      setNotFound(true);
    } else {
      setNotFound(false);
    }
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
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = function() {
      setPhotoImgSrc( reader.result)
    }
    if (file) {
      reader.readAsDataURL(file);
    } else {
      /// do nothing
    }
    setValues((values) => ({
      ...values,
      file: e.target.files[0],
    }));
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
    setPhotoImgSrc(inputURLRef.current.value)
    setFile(values.url);
  }
  function handleSubmit(values, e) {
    setLoadingProfileEdit(true);
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
          ref={inputURLRef}
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
          ) : notFound ? (
            <Typography variant="h2" align="center">
              Not found.
            </Typography>
          ) : (
            <>
              <Typography component="h1" className={styles.heading}>
                Change Info
              </Typography>
              <Typography className={styles.subheading}>
                Changes will be reflected to every services
              </Typography>
              <div className={styles.photo}>
                <ButtonBase
                  onClick={handleClickPhoto}
                  className={styles.btnPhoto}
                >
                  <img src={photoImgSrc} className={styles.photoBG} alt="" />
                  <CameraAltIcon />
                </ButtonBase>
                <div className="wrapper">
                  <div className="label">change photo</div>
                  <div className="filename">{file}</div>
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
                        value={file}
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
              <div className={styles.wrapperSubmit}>
                <Button
                  variant="contained"
                  color="primary"
                  className={styles.save}
                  disableElevation
                  type="submit"
                >
                  {loading ? (
                    <CircularProgress className={styles.loading} size={24} />
                  ) : (
                    "Save"
                  )}
                </Button>
                {errMsgs.submit.length > 0 && (
                  <span className={styles.submitMsg}>
                    <CheckCircleIcon />
                    {errMsgs.submit}
                  </span>
                )}
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
    loading: state.loadings.profileEdit,
  };
}
function mapDispatch(dispatch) {
  return {
    updateUser: (data) => dispatch(updateUser(data)),
    setLoadingProfileEdit: (payload) =>
      dispatch(setLoadingProfileEdit(payload)),
    setErrMsgProfileEdit: (payload) => dispatch(setErrMsgProfileEdit(payload)),
    setLoadingUser: (payload) => dispatch(setLoadingUser(payload)),
  };
}
export default connect(mapState, mapDispatch)(ProfileEdit);
