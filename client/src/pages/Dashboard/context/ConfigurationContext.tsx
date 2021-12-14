import React from 'react';

export type Configuration = {
  version: string;
};

export interface IConfigurationContext {
  configuration: Configuration | undefined;
  setConfiguration: React.Dispatch<
    React.SetStateAction<Configuration | undefined>
  >;
}

export const ConfigurationContext =
  React.createContext<IConfigurationContext | null>(null);
