export default function setLoadingUser(payload) {
  return {
    type: "FETCH_USER",
    payload,
  };
}
