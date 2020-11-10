import firebase from "../../firebase";

export default function updateUser({ password }) {
  return function (dispatch, getState) {
    const userDatabase = firebase.auth().currentUser;
    // userDatabase
    //   .updateEmail(email)
    //   .then((res) => {
    //     console.log("Update berhasil");
    //     dispatch({ type: "UPDATE_USER", payload: { email: email } });
    //   })
    //   .catch((error) => {
    //     console.log("Update Error", error);
    //   });
    userDatabase
      .updatePassword(password)
      .then(function (response) {
        // Update successful.
        console.log("Update berhasil!");
      })
      .catch(function (error) {
        // An error happened.
        console.log("Update gagal!");
      });
  };
}
