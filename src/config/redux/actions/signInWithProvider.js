// kalo register sekalian create data user di database firebase
import firebase, { database } from "../../firebase";
import setLoadingRegister from "./setLoadingRegister";
import setLoadingLogin from "./setLoadingLogin";
import setErrMsgLogin from "./setErrMsgLogin";
import setErrMsgRegister from "./setErrMsgRegister";
import setUser from "./setUser";
import setAuthLogin from "./setAuthLogin";

var google = new firebase.auth.GoogleAuthProvider();
var facebook = new firebase.auth.FacebookAuthProvider();
var twitter = new firebase.auth.TwitterAuthProvider();
var github = new firebase.auth.GithubAuthProvider();

export default function signInWithProvider(provider, method) {
  return function (dispatch) {
    if (method == "register") {
      dispatch(setLoadingRegister(true));
    } else {
      dispatch(setLoadingLogin(true));
    }
    let usedProvider;
    switch (provider) {
      case "google":
        usedProvider = google;
        break;
      case "facebook":
        usedProvider = facebook;
        break;
      case "twitter":
        usedProvider = twitter;
        break;
      case "github":
        usedProvider = github;
        break;
      default:
        break;
    }
    firebase
      .auth()
      .signInWithPopup(usedProvider)
      .then(function (response) {
        if (method == "register") {
          dispatch(setLoadingRegister(false));
        } else {
          dispatch(setLoadingLogin(false));
        }
        let user = {
          uid: response.user.uid,
          email: response.user.email,
          displayName: response.user.displayName || "",
          photoURL: response.user.photoURL || "",
          phoneNumber: response.user.phoneNumber || "",
          bio: "",
          password: false,
          providerId: response.additionalUserInfo.providerId,
        };
        const isNewUser = response.additionalUserInfo.isNewUser;
        if (isNewUser) {
          // simpan user di database, di redux dan login.
          database
            .ref(`users/${user.uid}`)
            .set(user)
            .then(() => {
              dispatch(setUser(user));
              dispatch(setAuthLogin(true));
            });
        } else {
          database
            .ref("/users/" + user.uid)
            .once("value")
            .then(function (snapshot) {
              const result = snapshot.val();
              // jika terjadi overwrite oleh Google maka set password = false
              if (
                result.providerId != "google.com" &&
                user.providerId == "google.com"
              ) {
                result.password = false;
                dispatch(setUser(result));
                dispatch(setAuthLogin(true));
                // password false di database
                database
                  .ref(`users/${user.uid}`)
                  .update({ password: false, providerId: user.providerId });
              } else {
                dispatch(setUser(result));
                dispatch(setAuthLogin(true));
              }
            });
        }
      })
      .catch(function (error) {
        const errorMessage = error.message;
        if (method == "register") {
          dispatch(setLoadingRegister(false));
          dispatch(setErrMsgRegister(errorMessage));
        } else {
          dispatch(setLoadingLogin(false));
          dispatch(setErrMsgLogin(errorMessage));
        }
      });
  };
}
