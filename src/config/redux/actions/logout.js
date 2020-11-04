import firebase from "../../firebase/index";
import setLoginAuth from "./setLoginAuth";

export default function logout() {
  return function (dispatch) {
    firebase
      .auth()
      .signOut()
      .then(function () {
        dispatch(setLoginAuth(false));
      })
      .catch(function (error) {
        console.log("Error =>", error);
      });
  };
}
