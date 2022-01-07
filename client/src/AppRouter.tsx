import React, { useContext } from 'react';
import { SelectAPlanPage } from './pages/SelectAPlanPage';
import { PaymentDetailsPage } from './pages/PaymentDetailsPage';
import ServersPage from './pages/ServersPage';
import { Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import ConfigureServer from './pages/Dashboard/ConfigureServer';
import Logs from './pages/Dashboard/Logs';
import { Overview } from './pages/Dashboard/Overview';
import { AuthenticationContext } from './context/AuthenticationContext';
import { RentAnotherDetailsPage } from './pages/RentAnotherDetailsPage';
import { PickVersionPage } from './pages/PickVersionPage';
import { FtpInfo } from './pages/Dashboard/FtpInfo';
import { Worlds } from './pages/Dashboard/Worlds';

export const AppRouter = () => {
  const { authentication } = useContext(
    AuthenticationContext
  )!;

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="plans" element={<SelectAPlanPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route
        path="plans/:planId/purchase"
        element={
          authentication ? (
            <RentAnotherDetailsPage />
          ) : (
            <PaymentDetailsPage />
          )
        }
      />
      <Route
        path="plans/:planId/configure"
        element={<PickVersionPage />}
      />
      <Route path="dashboard" element={<ServersPage />} />
      <Route
        path="dashboard/:serverId"
        element={<DashboardPage />}
      >
        <Route
          path="configure"
          element={<ConfigureServer />}
        />
        <Route path="logs" element={<Logs />} />
        <Route path="overview" element={<Overview />} />
        <Route path="ftp" element={<FtpInfo />} />
        <Route path="worlds" element={<Worlds />} />
      </Route>
    </Routes>
  );
};
