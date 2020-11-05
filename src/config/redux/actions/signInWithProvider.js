// kalo register sekalian create data user di database firebase
import firebase from "../../firebase";
import setRegisterLoading from "./setRegisterLoading";
import setLoginLoading from "./setLoginLoading";
import setLoginErrMsg from "./setLoginErrMsg";
import setRegisterErrMsg from "./setRegisterErrMsg";
import setUser from "./setUser";
import setLoginAuth from "./setLoginAuth";

var google = new firebase.auth.GoogleAuthProvider();
var facebook = new firebase.auth.FacebookAuthProvider();
var twitter = new firebase.auth.TwitterAuthProvider();
var github = new firebase.auth.GithubAuthProvider();

export default function signInWithProvider(provider, method) {
  return function (dispatch) {
    if (method == "register") {
      dispatch(setRegisterLoading(true));
    } else {
      dispatch(setLoginLoading(true));
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
          dispatch(setRegisterLoading(false));
        } else {
          dispatch(setLoginLoading(false));
        }
        const user = {
          providerId: response.additionalUserInfo.providerId,
          uid: response.user.uid,
          email: response.user.email,
          displayName: response.user.displayName,
          photoUrl: response.user.photoURL,
          phoneNumber: response.user.phoneNumber,
          password: "-",
        };
        if (method == "register") {
          firebase.database().ref(`users/${user.uid}`).set(user);
        }
        dispatch(setUser(user));
        dispatch(setLoginAuth(true));
      })
      .catch(function (error) {
        const errorMessage = error.message;
        console.log("catch method =>", method);
        if (method == "register") {
          dispatch(setRegisterLoading(false));
          dispatch(setRegisterErrMsg(errorMessage));
          console.log(errorMessage);
        } else {
          dispatch(setLoginLoading(false));
          dispatch(setLoginErrMsg(errorMessage));
        }
      });
  };
}
