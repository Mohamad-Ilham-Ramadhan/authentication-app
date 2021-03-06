import firebase, { database } from "../../firebase";
import setUser from "./setUser";
import setAuthLogin from "./setAuthLogin";
import setErrMsgLogin from "./setErrMsgLogin";
import setLoadingLogin from "./setLoadingLogin";

export default function login(
  { email, password } = { email: "", password: "" }
) {
  return function (dispatch) {
    dispatch(setLoadingLogin(true));
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(function (response) {
        console.log("sign in success =>", response);
        let user = {
          uid: response.user.uid,
          email: response.user.email,
          displayName: response.user.displayName,
          photoURL: response.user.photoURL,
        };
        database
          .ref(`users/${user.uid}`)
          .once("value")
          .then((snapshot) => {
            const value = snapshot.val();
            user.bio = value.bio || "";
            user.password = value.password || false;
            user.phoneNumber = value.phoneNumber || '';
            dispatch(setLoadingLogin(false));
            dispatch(setErrMsgLogin(""));
            dispatch(setUser(user));
            dispatch(setAuthLogin(true));
          });
      })
      .catch(function (error) {
        dispatch(setLoadingLogin(false));
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        dispatch(setErrMsgLogin(errorMessage));
      });
  };
}
