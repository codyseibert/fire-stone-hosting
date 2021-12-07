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

export const App = () => {
  const [authentication, setAuthentication] = useState<
    AuthenticationType | undefined
  >(() => {
    return JSON.parse(
      localStorage.getItem('authentication') || 'null'
    );
  });
  const [plan, setPlan] = useState<PlanType>();

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
        <BrowserRouter>
          <Navigation />
          <AppRouter />
        </BrowserRouter>
      </PlanContext.Provider>
    </AuthenticationContext.Provider>
  );
};

export default App;
