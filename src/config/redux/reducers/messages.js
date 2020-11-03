export default function messages(state = { register: "", login: "" }, action) {
  switch (action.type) {
    case "SET_REGISTER_MESSAGE":
      return { ...state, register: action.payload };
    case "SET_LOGIN_MESSAGE":
      return { ...state, login: action.payload };
    default:
      return state;
  }
}
