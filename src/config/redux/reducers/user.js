const initialState = {
  isNewUser: null,
  providerId: null,
  credential: null,
  uid: null,
  email: null,
  displayName: null,
  photoUrl: null,
  phoneNumber: null,
  password: null,
};
export default function user(state = initialState, action) {
  switch (action.type) {
    case "SET_USER":
      return action.payload;
    default:
      return state;
  }
}
