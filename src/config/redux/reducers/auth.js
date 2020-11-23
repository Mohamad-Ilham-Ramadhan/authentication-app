export default function auth(
  state = { login: false, authenticating: true, credential: null },
  action
) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, login: action.payload };
    case "AUTHENTICATING":
      return { ...state, authenticating: action.payload };
    default:
      return state;
  }
}
