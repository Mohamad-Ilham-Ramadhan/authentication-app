import firebase from "../../firebase/index";
import setAuthLogin from "./setAuthLogin";

export default function logout() {
  return function (dispatch) {
    firebase
      .auth()
      .signOut()
      .then(function () {
        dispatch(setAuthLogin(false));
      })
      .catch(function (error) {
        console.log("Error =>", error);
      });
  };
}
