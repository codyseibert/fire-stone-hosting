import React, { useContext, useEffect, useState } from "react";
import { ValidationError } from "yup";

import { NodeContext } from "./context/NodeContext";
import { ServerContext } from "./context/ServerContext";
import { getServerConfigurationApi } from "../../api/getServerConfigurationApi";
import { saveServerConfigurationApi } from "../../api/saveServerConfigurationApi";
import { severConfigObject } from "config/validation/serverConfig";

type KeyValueType = string | number | boolean;

type InputFieldProps = {
  value: KeyValueType;
  label: string;
  onChange: (inputValue: KeyValueType) => void;
};

const InputField: React.FC<InputFieldProps> = ({ value, label, onChange }) => {
  if (typeof value === "boolean") {
    return (
      <div className="h-100 d-flex align-items-center">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={value}
            id={`check-${label}`}
            onChange={(e) => onChange(e.target.checked)}
          />
          <label className="form-check-label" htmlFor={`check-${label}`}>
            {label}
          </label>
        </div>
      </div>
    );
  }

  const inputType = typeof value === "number" ? "number" : "text";

  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        className="form-control"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={inputType}
      />
    </div>
  );
};

const ConfigureServer = () => {
  const { node } = useContext(NodeContext)!;
  const { server } = useContext(ServerContext)!;
  const [values, setValues] = useState<Record<string, KeyValueType>>({});

  useEffect(() => {
    if (!server || !node) return;

    getServerConfigurationApi({
      nodeIp: node.ip,
      serverId: server.id,
    }).then((configuration) => {
      setValues(configuration);
    });
  }, [server, node]);

  const saveConfiguration = async () => {
    let isValid = false;

    try {
      await severConfigObject.validate(values);

      isValid = true;
    } catch (err) {
      alert((err as ValidationError).message);
    }

    if (isValid) {
      await saveServerConfigurationApi({
        nodeIp: node!.ip,
        serverId: server!.id,
        configuration: values,
      });
    }
  };

  if (!server) return null;

  return (
    <>
      <div className="row mb-4">
        <div className="col">
          <h4>Server Properties</h4>
        </div>
      </div>

      <div className="row mb-4">
        {Object.entries(values).map(([key, value]) => (
          <div key={`input-${key}`} className="col-md-4 mb-4">
            <InputField
              label={key}
              value={value}
              onChange={(inputValue: KeyValueType) => {
                setValues({
                  ...values,
                  [key]: inputValue,
                });
              }}
            />
          </div>
        ))}
      </div>

      <div className="row">
        <div className="col">
          <button
            onClick={saveConfiguration}
            type="submit"
            className="btn btn-primary"
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default ConfigureServer;
