import firebase from "../../firebase";
import setUser from "./setUser";
import setLoginAuth from "./setLoginAuth";
import setLoginErrMsg from "./setLoginErrMsg";
import setLoginLoading from "./setLoginLoading";

export default function login(
  { email, password } = { email: "", password: "" }
) {
  return function (dispatch) {
    dispatch(setLoginLoading(true));
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(function (response) {
        console.log(response);
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
        dispatch(setLoginLoading(false));
        dispatch(setLoginErrMsg(""));
        dispatch(setUser(user));
        dispatch(setLoginAuth(true));
      })
      .catch(function (error) {
        dispatch(setLoginLoading(false));
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        dispatch(setLoginErrMsg(errorMessage));
      });
  };
}
