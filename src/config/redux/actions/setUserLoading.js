export default function setUserLoading(payload) {
  return {
    type: "FETCH_USER",
    payload,
  };
}
