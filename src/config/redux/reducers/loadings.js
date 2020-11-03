export default function loadings(
  state = { register: false, login: false },
  action
) {
  switch (action.type) {
    case "SET_REGISTER_LOADING":
      return { ...state, register: action.payload };
    case "SET_LOGIN_LOADING":
      return { ...state, login: action.payload };
    default:
      return state;
  }
}
