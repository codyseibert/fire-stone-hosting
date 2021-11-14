import React from "react";
import { connect } from "react-redux";
import setFormKey from "../actions/setFormKey.action";
import setPlan from "../actions/setPlan.action";
import { State } from "..";
import { History } from "history";

const ConfigureServer = ({
  server,
  history,
  configuration,
}: {
  history: History;
  server: {
    id: string;
    ip: string;
    port: number;
  };
  configuration: {
    motd: string;
    maxPlayers: number;
  };
}) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label>Hostname</label>
            <input
              className="form-control"
              value="funserver.firestonehosting.com"
              readOnly={true}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <label>Address</label>
            <input
              className="form-control"
              value={`${server.ip}:${server.port}`}
              readOnly={true}
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <form>
            <div className="form-group">
              <label>Max players</label>
              <input
                className="form-control"
                defaultValue={configuration.maxPlayers}
              />
            </div>

            <div className="form-group">
              <label>Message of the day</label>
              <input
                className="form-control"
                defaultValue={configuration.motd}
              />
            </div>

            <div className="form-group">
              <label>Difficulty</label>
              <select className="form-control">
                <option>Easy</option>
                <option>Hard</option>
                <option>Brutual</option>
              </select>
            </div>
            <button
              onClick={() => {
                history.push("/purchase/payment-details");
              }}
              type="submit"
              className="btn btn-primary"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  form: state.form,
  error: state.error,
  plan: state.plan,
  server: state.server,
  configuration: state.configuration,
});

const mapDispatchToProps = {
  setFormKey,
  setPlan,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfigureServer);
