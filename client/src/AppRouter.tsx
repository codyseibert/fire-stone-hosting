import React from "react";
import Landing from "./components/SelectAPlan";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import ConfigurePlan from "./components/ConfigurePlan";
import CreateAccount from "./components/CreateAccount";
import PaymentDetails from "./components/PaymentDetails";
import ServersPage from "./pages/ServersPage";
import SelectAPlan from "./components/SelectAPlan";
import LoginPage from "./pages/LoginPage";
import PurchaseConfirm from "./components/PurchaseConfirm";
import { Routes, Route, Link } from "react-router-dom";
import ConfigureServer from "./components/ConfigureServer";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<ServersPage />} />
      <Route path="dashboard/:serverId" element={<DashboardPage />}>
        <Route path="configure" element={<ConfigureServer />} />
      </Route>
      {/* <Route path="/purchase/select-a-plan" element={<SelectAPlan />} /> */}
      <Route path="purchase/configure" element={<ConfigurePlan />} />
      <Route path="login" element={<LoginPage />} />
      {/* <Route path="/purchase/create-account" element={<CreateAccount />} /> */}
      <Route path="plans/:planId/purchase" element={<PurchaseConfirm />} />
      <Route path="purchase/payment-details" element={<PaymentDetails />} />
      <Route path="/" element={<Landing />} />
    </Routes>
  );
};
