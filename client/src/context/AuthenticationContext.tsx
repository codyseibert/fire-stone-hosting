import React from 'react';

export type AuthenticationType = {
  token: string;
  user: {
    id: string;
    name: string;
  };
};

export interface AppContextInterface {
  authentication: AuthenticationType | undefined;
  setAuthentication: React.Dispatch<
    React.SetStateAction<AuthenticationType | undefined>
  >;
}

export const AuthenticationContext =
  React.createContext<AppContextInterface | null>(null);
