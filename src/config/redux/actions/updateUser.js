import firebase, { database } from "../../firebase";
import setErrMsgProfileEdit from "./setErrMsgProfileEdit";
import setLoadingProfileEdit from "./setLoadingProfileEdit";

const type = "UPDATE_USER";
export default function updateUser({
  password,
  email,
  displayName,
  bio,
  phoneNumber,
}) {
  return function (dispatch, getState) {
    const user = firebase.auth().currentUser;
    const newData = { displayName, bio, phoneNumber };
    const promiseProfile = new Promise((res, rej) => {
      user
        .updateProfile(newData)
        .then((response) => {
          database
            .ref(`users/${user.uid}`)
            .update({ displayName, bio, phoneNumber })
            .then((response) => {
              dispatch({ type, payload: newData });
              res("profile success");
            })
            .catch((err) => {
              const msg = err.message;
              dispatch(
                setErrMsgProfileEdit({
                  displayName: msg,
                  bio: msg,
                  phoneNumber: msg,
                })
              );
              rej("profile failed");
            });
        })
        .catch((err) => {
          const msg = err.message;
          dispatch(
            setErrMsgProfileEdit({
              displayName: msg,
              bio: msg,
              phoneNumber: msg,
            })
          );
          rej("profile failed");
        });
    });
    const promiseEmail = new Promise((res, rej) => {
      user
        .updateEmail(email)
        .then((response) => {
          database
            .ref(`users/${user.uid}`)
            .update({ email })
            .then((response) => {
              dispatch({ type, payload: { email } });
              res("email success");
            })
            .catch((err) => {
              const msg = err.message;
              dispatch(setErrMsgProfileEdit({ email: msg }));
              rej("email failed");
            });
        })
        .catch((err) => {
          const msg = err.message;
          dispatch(setErrMsgProfileEdit({ email: msg }));
          rej("email failed");
        });
    });
    let promisePassword;
    if (password.length >= 0) {
      promisePassword = new Promise((res, rej) => {
        user
          .updatePassword(password)
          .then((response) => {
            database
              .ref(`users/${user.uid}`)
              .update({ password: true })
              .then((response) => {
                dispatch({ type, payload: { password: true } });
                res("password success");
              })
              .catch((err) => {
                const msg = err.message;
                dispatch(setErrMsgProfileEdit({ password: msg }));
                rej("password failed");
              });
          })
          .catch((err) => {
            const msg = err.message;
            dispatch(setErrMsgProfileEdit({ password: msg }));
            rej("password failed");
          });
      });
    }
    const promises = [promiseProfile, promiseEmail, promisePassword];
    Promise.allSettled(promises).then((result) => {
      dispatch(setLoadingProfileEdit(false));
      console.log("The result of userUpdate =>", result);
    });
  };
}
