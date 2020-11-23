import firebase, { database, storage } from "../../firebase";
import setErrMsgProfileEdit from "./setErrMsgProfileEdit";
import setLoadingProfileEdit from "./setLoadingProfileEdit";

const type = "UPDATE_USER";
export default function updateUser({
  password,
  email,
  displayName,
  bio,
  phoneNumber,
  file,
}) {
  return function (dispatch, getState) {
    const user = firebase.auth().currentUser;
    const newData = { displayName, bio, phoneNumber };

    dispatch(setLoadingProfileEdit(true));
    console.log(file);
    // mencoba mengupload ke firebase storage
    const storageRef = storage.ref()
    const profileRef = storageRef.child(`/images/profile/${user.uid}`)
    
    user
      .updateEmail(email)
      .then((response) => {
        console.log("update email success");
        database
          .ref(`users/${user.uid}`)
          .update({ email })
          .then((response) => {
            dispatch({ type, payload: { email } });
            dispatch(setErrMsgProfileEdit({ email: "" }));
            // reload user
            user
              .reload() // The best answer
              .then(() => {
                console.log("reauthenticate succes, and response is =>");
                // lalu update password
                if (password.length > 0) {
                  user
                    .updatePassword(password)
                    .then(() => {
                      console.log("Update password berhasil");
                      database
                        .ref(`users/${user.uid}`)
                        .update({ password: true })
                        .then((response) => {
                          dispatch({ type, payload: { password: true } });
                          dispatch(setErrMsgProfileEdit({ password: "" }));
                          // user reauthenticate lagi untuk updateProfile()
                          user.reload().then(() => {
                            // photoURL 
                            profileRef.put(file).then( snapshot => {
                              console.log('snapshot =>', snapshot);
                              profileRef.getDownloadURL().then(url => {
                                console.log(url);
                                user.updateProfile({photoURL: url}).then(() => {
                                  database.ref(`users/${user.uid}`).update({photoURL: url}).then(() => {
                                    console.log('update photo propil sukses!')
                                  })
                                })
                              })
                            }).catch( err => {
                              console.log('upload photo error => ', err);
                            })
                            //
                            user
                              .updateProfile(newData)
                              .then(() => {
                                database
                                  .ref(`users/${user.uid}`)
                                  .update(newData)
                                  .then((response) => {
                                    console.log("update profile sukses");
                                    dispatch({ type, payload: newData });
                                    dispatch(
                                      setErrMsgProfileEdit({
                                        displayName: "",
                                        bio: "",
                                        phoneNumber: "",
                                      })
                                    );
                                    dispatch(setLoadingProfileEdit(false));
                                  })
                                  .catch((err) => {
                                    console.log("update profile gagal =>", err);
                                    const msg = err.message;
                                    dispatch(
                                      setErrMsgProfileEdit({
                                        displayName: msg,
                                        bio: msg,
                                        phoneNumber: msg,
                                      })
                                    );
                                    dispatch(setLoadingProfileEdit(false));
                                  });
                              })
                              .catch((err) => {
                                console.log("update profile gagal =>", err);
                                const msg = err.message;
                                dispatch(
                                  setErrMsgProfileEdit({
                                    displayName: msg,
                                    bio: msg,
                                    phoneNumber: msg,
                                  })
                                );
                                dispatch(setLoadingProfileEdit(false));
                              });
                          });
                        })
                        .catch((err) => {
                          console.log("update password gagal =>", err);
                          const msg = err.message;
                          dispatch(setErrMsgProfileEdit({ password: msg }));
                          dispatch(setLoadingProfileEdit(false));
                        });
                    })
                    .catch((err) => {
                      console.log("update password gagal =>", err);
                      const msg = err.message;
                      dispatch(setErrMsgProfileEdit({ password: msg }));
                      dispatch(setLoadingProfileEdit(false));
                    });
                } else {
                  // jika tidak updatePassword() maka updateProfile() tetap dieksekusi
                  user
                    .updateProfile(newData)
                    .then(() => {
                      database
                        .ref(`users/${user.uid}`)
                        .update(newData)
                        .then((response) => {
                          console.log("update profile sukses");
                          dispatch({ type, payload: newData });
                          dispatch(
                            setErrMsgProfileEdit({
                              displayName: "",
                              bio: "",
                              phoneNumber: "",
                            })
                          );
                          dispatch(setLoadingProfileEdit(false));
                        })
                        .catch((err) => {
                          console.log("update profile gagal =>", err);
                          const msg = err.message;
                          dispatch(
                            setErrMsgProfileEdit({
                              displayName: msg,
                              bio: msg,
                              phoneNumber: msg,
                            })
                          );
                          dispatch(setLoadingProfileEdit(false));
                        });
                    })
                    .catch((err) => {
                      console.log("update profile gagal =>", err);
                      const msg = err.message;
                      dispatch(
                        setErrMsgProfileEdit({
                          displayName: msg,
                          bio: msg,
                          phoneNumber: msg,
                        })
                      );
                    });
                }
              })
              .catch((err) => {
                console.log("reauth is fail and the error is =>", err);
                dispatch(setLoadingProfileEdit(false));
              });
          })
          .catch((err) => {
            const msg = err.message;
            dispatch(setErrMsgProfileEdit({ email: msg }));
            dispatch(setLoadingProfileEdit(false));
          });
      })
      .catch((err) => {
        console.log("update email gagal =>", err);
        const msg = err.message;
        dispatch(setErrMsgProfileEdit({ email: msg }));
        rej("email failed");
      });

    
  };
}
