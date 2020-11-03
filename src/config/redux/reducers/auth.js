export default function auth(state = { login: false }, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, login: action.payload };
    default:
      return state;
  }
}
