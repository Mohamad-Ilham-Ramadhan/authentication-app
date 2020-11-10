// kalo register sekalian create data user di database firebase
import firebase, { database } from "../../firebase";
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
        let user = {
          providerId: response.additionalUserInfo.providerId,
          uid: response.user.uid,
          email: response.user.email,
          displayName: response.user.displayName,
          photoUrl: response.user.photoURL,
          phoneNumber: response.user.phoneNumber,
        };
        const isNewUser = response.additionalUserInfo.isNewUser;
        if (isNewUser) {
          // fetch bio jika login
          database
            .ref(`users/${user.uid}`)
            .set({
              bio: "",
            })
            .then(() => {
              dispatch(setUser(user));
              dispatch(setLoginAuth(true));
            });
        } else {
          database
            .ref("/users/" + user.uid)
            .once("value")
            .then(function (snapshot) {
              user.bio = snapshot.val().bio || "";
              dispatch(setUser(user));
              dispatch(setLoginAuth(true));
            });
        }
      })
      .catch(function (error) {
        const errorMessage = error.message;
        if (method == "register") {
          dispatch(setRegisterLoading(false));
          dispatch(setRegisterErrMsg(errorMessage));
        } else {
          dispatch(setLoginLoading(false));
          dispatch(setLoginErrMsg(errorMessage));
        }
      });
  };
}
