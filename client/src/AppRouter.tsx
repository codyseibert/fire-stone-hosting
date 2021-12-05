import React from "react";
import SelectAPlan from "./components/SelectAPlan";
// import DashboardPage from "./pages/Dashboard/DashboardPage";
// import ConfigurePlan from "./components/ConfigurePlan";
// import PaymentDetails from "./components/PaymentDetails";
// import ServersPage from "./pages/ServersPage";
// import LoginPage from "./pages/LoginPage";
// import PurchaseConfirm from "./components/PurchaseConfirm";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
// import ConfigureServer from "./components/ConfigureServer";
// import Logs from "./pages/Dashboard/Logs";

export const AppRouter = () => {
  return (
    <Routes>
      {/* <Route path="dashboard" element={<ServersPage />} />
      <Route path="dashboard/:serverId" element={<DashboardPage />}>
        <Route path="configure" element={<ConfigureServer />} />
        <Route path="logs" element={<Logs />} />
      </Route>
      <Route path="purchase/configure" element={<ConfigurePlan />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="plans/:planId/purchase" element={<PurchaseConfirm />} />
      <Route path="purchase/payment-details" element={<PaymentDetails />} /> */}
      <Route path="/" element={<Landing />} />
      <Route path="/plans" element={<SelectAPlan />} />
    </Routes>
  );
};
