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
    // file type is [null, File, string(url)]
    console.log('file =>', file);
    console.log('type of file =>', typeof file);
    const user = firebase.auth().currentUser;
    const newData = { displayName, bio, phoneNumber };
    const profileRef = storage.ref().child(`/images/profile/${user.uid}`);

    async function updateProfile() {
      if (file == null) {
        try {
          const data = newData;
          const updateProfileAuth = user.updateProfile(data);
          console.log('update profile auth SUKSES');
          const updateProfileDatabase = database.ref(`users/${user.uid}`).update(data);
          console.log('update profile di realtime database SUKSES!');
          dispatch({ type, payload: data });
          dispatch(
            setErrMsgProfileEdit({
              displayName: "",
              bio: "",
              phoneNumber: "",
              photoURL: '',
              submit: 'saved'
            })
          );
        } catch (err) {
          console.log("update profile gagal =>", err);
          const msg = err.message;
          dispatch(
            setErrMsgProfileEdit({
              displayName: msg,
              bio: msg,
              phoneNumber: msg,
              photoURL: msg,
            })
          );
          dispatch(setLoadingProfileEdit(false));
        }
      } else if (typeof file == 'string') {
        try {
          const data = { ...newData, photoURL: file };
          const updateProfileAuth = user.updateProfile(data);
          console.log('update profile auth SUKSES');
          const updateProfileDatabase = database.ref(`users/${user.uid}`).update(data);
          console.log('update profile di realtime database SUKSES!');
          dispatch({ type, payload: data });
          dispatch(
            setErrMsgProfileEdit({
              displayName: "",
              bio: "",
              phoneNumber: "",
              photoURL: '',
              submit: 'saved'
            })
          );
        } catch (err) {
          console.log("update profile gagal =>", err);
          const msg = err.message;
          dispatch(
            setErrMsgProfileEdit({
              displayName: msg,
              bio: msg,
              phoneNumber: msg,
              photoURL: msg,
            })
          );
          dispatch(setLoadingProfileEdit(false));
        }
      } else {
        try {
          const snapshot = await profileRef.put(file);
          console.log('Taruh photo profile di storage SUKSES');
          const url = await profileRef.getDownloadURL();
          console.log('Url didapatkan =>', url);
          const data = { ...newData, photoURL: url };
          const updateProfileAuth = user.updateProfile(data);
          console.log('update profile auth SUKSES');
          const updateProfileDatabase = database.ref(`users/${user.uid}`).update(data);
          console.log('update profile di realtime database SUKSES!');
          dispatch({ type, payload: data });
          dispatch(
            setErrMsgProfileEdit({
              displayName: "",
              bio: "",
              phoneNumber: "",
              photoURL: '',
              submit: 'saved'
            })
          );
        } catch (err) {
          console.log("update profile gagal =>", err);
          const msg = err.message;
          dispatch(
            setErrMsgProfileEdit({
              displayName: msg,
              bio: msg,
              phoneNumber: msg,
              photoURL: msg,
            })
          );
          dispatch(setLoadingProfileEdit(false));
        }

      }
      dispatch(setLoadingProfileEdit(false));
    }
    // dispatch(setLoadingProfileEdit(true));
    async function updateEmail() {
      try {
        const updateEmailAuth = await user.updateEmail(email);
        console.log('update email in auth SUKES');
        const updateEmailDatabase = await database.ref(`users/${user.uid}`).update({ email });
        console.log('update email di realtime database SUKSES');
        dispatch({ type, payload: { email } });
        dispatch(setErrMsgProfileEdit({ email: '' }));
      } catch (err) {
        console.log('update email GAGAL');
        const msg = err.message;
        dispatch(setErrMsgProfileEdit({ email: msg }));
        dispatch(setLoadingProfileEdit(false));
      }
      // reload user
      try {
        const userReload = await user.reload();

        console.log('reauthenticate (reload) SUKSES');
      } catch (err) {
        console.log('reauthenticate (reload) GAGAL');
        dispatch(setLoadingProfileEdit(false));
      }
      if (password.length > 0) {
        try {
          const updatePasswordAuth = await user.updatePassword(password);
          console.log('update password auth SUKSES')
          const updatePasswordDatabase = await database.ref(`user/${user.uid}`).update({ password: true })
          console.log('update password di database SUKSES')
          dispatch({ type, payload: { password: true } })
          dispatch(setErrMsgProfileEdit({ password: '' }))
        } catch (err) {
          console.log("update password GAGAL =>", err);
          const msg = err.message;
          dispatch(setErrMsgProfileEdit({ password: msg }));
          dispatch(setLoadingProfileEdit(false));
        }
        // re-auth buat updateProfile();
        try {
          const userReload = await user.reload();
        } catch (err) {
          console.log('reauthenticate (reload) GAGAL');
          dispatch(setLoadingProfileEdit(false));
        }
        updateProfile();
      } else {
        updateProfile();
      }
    }
    updateEmail();
  };
}
