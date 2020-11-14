const initialState = {
  register: "",
  login: "",
  profileEdit: {
    displayName: "",
    bio: "",
    phoneNumber: "",
    email: "",
    password: "",
    submit: "",
  },
};
export default function messages(state = initialState, action) {
  switch (action.type) {
    case "SET_REGISTER_MESSAGE":
      return { ...state, register: action.payload };
    case "SET_LOGIN_MESSAGE":
      return { ...state, login: action.payload };
    case "SET_PROFILE_EDIT_MESSAGE":
      return {
        ...state,
        profileEdit: { ...state.profileEdit, ...action.payload },
      };
    default:
      return state;
  }
}
