import { Dispatch } from "react";
import { State } from "..";
import history from "../history";

export default ({ serverId }: { serverId: string }) =>
  async (dispatch: Dispatch<object>, getState: () => State) => {
    history.push(`/dashboard/${serverId}/configure`);
  };
