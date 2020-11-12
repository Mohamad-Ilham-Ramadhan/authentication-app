import firebase, { database } from "../../firebase";
const type = "UPDATE_USER";
export default function updateUser({
  password,
  email,
  displayName,
  bio,
  phoneNumber,
}) {
  return function (dispatch, getState) {
    const user = firebase.auth().currentUser;
    // user
    //   .updateEmail(email)
    //   .then((res) => {
    //     console.log("Update berhasil");
    //     dispatch({ type: "UPDATE_USER", payload: { email: email } });
    //   })
    //   .catch((error) => {
    //     console.log("Update Error", error);
    //   });
    // user.updateProfile()
    user
      .updateEmail(email)
      .then(function (response) {
        console.log("Update email berhasil!");
        database.ref(`users/${user.uid}`).update({ email });
        dispatch({ type, payload: { email } });
      })
      .catch(function (error) {
        console.log("Update email gagal!");
      });
    if (password.length >= 0) {
      //
      user
        .updatePassword(password)
        .then(function (response) {
          console.log("Update password berhasil!");
          database.ref(`users/${user.uid}`).update({ password: true });
          dispatch({ type, payload: { password: true } });
        })
        .catch(function (error) {
          console.log("Update password gagal!");
        });
    }
  };
}
