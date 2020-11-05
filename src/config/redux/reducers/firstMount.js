export default function firstMount(state = true, action) {
  switch (action.type) {
    case "SET_FIRST_MOUNT":
      return action.payload;
    default:
      return state;
  }
}
