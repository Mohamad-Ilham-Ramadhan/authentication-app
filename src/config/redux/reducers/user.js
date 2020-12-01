const initialState = {
  providerId: null,
  credential: null,
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  phoneNumber: null,
  password: null,
};
export default function user(state = initialState, action) {
  switch (action.type) {
    case "SET_USER":
      return action.payload;
    case "UPDATE_USER":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
