export default (payload: object) => {
  return {
    type: "SET_FORM_KEY",
    payload,
  };
};
