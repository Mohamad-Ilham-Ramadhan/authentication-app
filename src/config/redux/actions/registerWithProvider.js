// kalo register sekalian create data user di database firebase
import firebase from "../../firebase";
import setRegisterLoading from "./setRegisterLoading";
import setRegisterErrMsg from "./setRegisterErrMsg";
import setUser from "./setUser";
import setLoginAuth from "./setLoginAuth";

var google = new firebase.auth.GoogleAuthProvider();
var facebook = new firebase.auth.FacebookAuthProvider();
var twitter = new firebase.auth.TwitterAuthProvider();
var github = new firebase.auth.GithubAuthProvider();

export default function registerWithProvider(provider) {
  return function (dispatch) {
    dispatch(setRegisterLoading(true));
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
        dispatch(setRegisterLoading(false));
        const user = {
          isNewUser: response.additionalUserInfo.isNewUser,
          providerId: response.additionalUserInfo.providerId,
          uid: response.user.uid,
          email: response.user.email,
          displayName: response.user.displayName,
          photoUrl: response.user.photoURL,
          phoneNumber: response.user.phoneNumber,
          password: password,
        };
        dispatch(setUser(user));
        dispatch(setLoginAuth(true));
      })
      .catch(function (error) {
        dispatch(setRegisterLoading(false));
        var errorMessage = error.message;
        dispatch(setRegisterErrMsg(errorMessage));
      });
  };
}
