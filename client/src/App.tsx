import React, { useEffect, useState } from 'react';
import { AppRouter } from './AppRouter';
import Navigation from './components/Navigation';
import { BrowserRouter } from 'react-router-dom';
import {
  AuthenticationContext,
  AuthenticationType,
} from './context/AuthenticationContext';
import {
  PlanContext,
  PlanType,
} from './context/PlanContext';
import {
  Configuration,
  ConfigurationContext,
} from './pages/Dashboard/context/ConfigurationContext';

export const App = () => {
  const [authentication, setAuthentication] = useState<
    AuthenticationType | undefined
  >(() => {
    return JSON.parse(
      localStorage.getItem('authentication') || 'null'
    );
  });
  const [plan, setPlan] = useState<PlanType>();
  const [configuration, setConfiguration] =
    useState<Configuration>();

  useEffect(() => {
    localStorage.setItem(
      'authentication',
      JSON.stringify(authentication || null)
    );
  }, [authentication]);

  return (
    <AuthenticationContext.Provider
      value={{
        authentication,
        setAuthentication,
      }}
    >
      <PlanContext.Provider
        value={{
          plan,
          setPlan,
        }}
      >
        <ConfigurationContext.Provider
          value={{ configuration, setConfiguration }}
        >
          <BrowserRouter>
            <Navigation />
            <AppRouter />
          </BrowserRouter>
        </ConfigurationContext.Provider>
      </PlanContext.Provider>
    </AuthenticationContext.Provider>
  );
};

export default App;
