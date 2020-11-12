// kalo register sekalian create data user di database firebase
import firebase, { database } from "../../firebase";
import setLoadingRegister from "./setLoadingRegister";
import setErrMsgRegister from "./setErrMsgRegister";
import setUser from "./setUser";
import setAuthLogin from "./setAuthLogin";
export default function register(
  { email, password } = { email: "", password: "" }
) {
  return function (dispatch) {
    dispatch(setLoadingRegister(true));
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function (response) {
        dispatch(setLoadingRegister(false));
        const user = {
          uid: response.user.uid,
          email: response.user.email,
          displayName: response.user.displayName || "",
          photoUrl: response.user.photoURL || "",
          phoneNumber: response.user.phoneNumber || "",
          password: true,
          bio: "",
          providerId: response.additionalUserInfo.providerId,
        };
        // save user data in firebase realtime database
        database
          .ref(`users/${user.uid}`)
          .set(user)
          .then(() => {
            dispatch(setUser(user));
            dispatch(setAuthLogin(true));
          });
      })
      .catch(function (error) {
        dispatch(setLoadingRegister(false));
        const errorCode = error.code;
        const errorMessage = error.message;
        dispatch(setErrMsgRegister(errorMessage));
      });
  };
}
