import React, { Dispatch, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import setFormKey from "../actions/setFormKey.action";
import setPlan from "../actions/setPlan.action";
import { State } from "..";
import axios from "axios";
import getServer from "../http/getServer.http";
import { useNavigate, useParams } from "react-router-dom";
import { setServers } from "dns";
import { Server } from "../../../api/src/models/Server";

const ConfigurePlan = () => {
  const [server, setServer] = useState<Server>();
  const params = useParams();
  const serverId = params.serverId!;
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      const serverFromBackend = await getServer({ serverId });
      setServer(serverFromBackend);
    };
    init();
  }, []);

  if (!server) return null;

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6 mt-2">
          <h1>Customize Your Server</h1>
        </div>
        <div className="col-md-6">
          <div className="shadow-sm p-3 pt-4 bg-info text-white rounded">
            <h6>
              Selected Plan:{" "}
              {/* <img src={props.plan.imageSrc} style={{ width: "30px" }} />{" "} */}
              {server.memory} GB, $ {(server.memory * 3).toFixed(2)} / month
            </h6>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-12">
          <div className="alert alert-info" role="alert">
            <div className="row">
              <div className="col-md-1 text-center">
                <FontAwesomeIcon size="lg" icon="info-circle" />
              </div>
              <div className="col-md-11">
                You can always modify these server configurations later.
              </div>
            </div>
          </div>

          <form>
            <div className="form-group">
              <label>Max players</label>
              <input
                className="form-control"
                // defaultValue={props.configuration.maxPlayers}
              />
            </div>

            <div className="form-group">
              <label>Message of the day</label>
              <input
                className="form-control"
                // defaultValue={props.configuration.motd}
              />
            </div>
            <button
              onClick={() => {
                navigate("/purchase/payment-details");
              }}
              type="submit"
              className="btn btn-primary"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfigurePlan;
