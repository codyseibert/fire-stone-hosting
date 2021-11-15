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

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<ServersPage />} />
      {/* <Route path="/dashboard/:serverId" element={<DashboardPage />} /> */}
      {/* <Route path="/purchase/select-a-plan" element={<SelectAPlan />} /> */}
      {/* <Route path="/purchase/configure" element={<ConfigurePlan />} /> */}
      <Route path="/login" element={<LoginPage />} />
      {/* <Route path="/purchase/create-account" element={<CreateAccount />} /> */}
      {/* <Route path="/purchase/confirm" element={<PurchaseConfirm />} /> */}
      {/* <Route path="/purchase/payment-details" element={<PaymentDetails />} /> */}
      {/* <Route element={<Landing />} /> */}
    </Routes>
  );
};
