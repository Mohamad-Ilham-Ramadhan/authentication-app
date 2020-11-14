export default function loadings(
  state = { register: true, login: true, user: true, profileEdit: false },
  action
) {
  switch (action.type) {
    case "SET_REGISTER_LOADING":
      return { ...state, register: action.payload };
    case "SET_LOGIN_LOADING":
      return { ...state, login: action.payload };
    case "SET_LOADING_PROFILE_EDIT":
      return { ...state, profileEdit: action.payload };
    case "FETCH_USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
}
