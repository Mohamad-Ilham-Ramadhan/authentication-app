// kalo register sekalian create data user di database firebase
import firebase from "../../firebase";
import setRegisterLoading from "./setRegisterLoading";
import setRegisterErrMsg from "./setRegisterErrMsg";
import setUser from "./setUser";
import setLoginAuth from "./setLoginAuth";
export default function register(
  { email, password } = { email: "", password: "" }
) {
  return function (dispatch) {
    dispatch(setRegisterLoading(true));
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function (response) {
        dispatch(setRegisterLoading(false));
        const user = {
          isNewUser: response.additionalUserInfo.isNewUser,
          providerId: response.additionalUserInfo.providerId,
          credential: response.credential,
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
        const errorCode = error.code;
        const errorMessage = error.message;
        dispatch(setRegisterErrMsg(errorMessage));
      });
  };
}
