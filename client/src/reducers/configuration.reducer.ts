export type Action = {
  type: string;
  payload: object;
};

export default (state = {}, action: Action) => {
  switch (action.type) {
    default:
      return state;
  }
};
