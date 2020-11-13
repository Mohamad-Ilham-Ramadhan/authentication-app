import firebase, { database } from "../../firebase";
import setErrMsgProfileEdit from "./setErrMsgProfileEdit";

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
    user
      .updateProfile(newData)
      .then((res) => {
        database
          .ref(`users/${user.uid}`)
          .update({ displayName, bio, phoneNumber })
          .then((res) => {
            dispatch({ type, payload: newData });
          })
          .catch((err) => {
            dispatch(
              setErrMsgProfileEdit({
                displayName: msg,
                bio: msg,
                phoneNumber: msg,
              })
            );
          });
      })
      .catch((err) => {
        const msg = err.message;
        dispatch(
          setErrMsgProfileEdit({ displayName: msg, bio: msg, phoneNumber: msg })
        );
      });
    user
      .updateEmail(email)
      .then((res) => {
        database
          .ref(`users/${user.uid}`)
          .update({ email })
          .then((res) => {
            dispatch({ type, payload: { email } });
          })
          .catch((err) => {
            const msg = err.message;
            dispatch(setErrMsgProfileEdit({ email: msg }));
          });
      })
      .catch((err) => {
        const msg = err.message;
        dispatch(setErrMsgProfileEdit({ email: msg }));
      });
    if (password.length >= 0) {
      //
      user
        .updatePassword(password)
        .then((res) => {
          database
            .ref(`users/${user.uid}`)
            .update({ password: true })
            .then((res) => {
              dispatch({ type, payload: { password: true } });
            })
            .catch((err) => {
              const msg = err.message;
              dispatch(setErrMsgProfileEdit({ password: msg }));
            });
        })
        .catch((err) => {
          const msg = err.message;
          dispatch(setErrMsgProfileEdit({ password: msg }));
        });
    }
  };
}
