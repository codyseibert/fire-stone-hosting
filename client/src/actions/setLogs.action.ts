export default (payload: object) => {
  return {
    type: "SET_LOGS",
    payload,
  };
};
