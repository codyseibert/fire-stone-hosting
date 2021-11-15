import { IAction } from "./rootReducer";

export type Action = {
  type: string;
  payload: object;
};
export interface IConfigurationReducer {
  (state: any | undefined, action: IAction): any;
}

const configurationReducer: IConfigurationReducer = (
  state = {},
  action: Action
) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default configurationReducer;
