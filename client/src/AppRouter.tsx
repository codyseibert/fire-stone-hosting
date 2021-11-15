import React from "react";
import Landing from "./components/SelectAPlan";
import DashboardPage from "./components/Dashboard/DashboardPage";
import ConfigurePlan from "./components/ConfigurePlan";
import CreateAccount from "./components/CreateAccount";
import PaymentDetails from "./components/PaymentDetails";
import Servers from "./components/Servers";
import SelectAPlan from "./components/SelectAPlan";
import Login from "./components/Login";
import PurchaseConfirm from "./components/PurchaseConfirm";
import { Routes, Route, Link } from "react-router-dom";

export const AppRouter = () => {
  return (
    <Routes>
      {/* <Route exact path="/dashboard" component={Servers} />
      <Route path="/dashboard/:serverId" component={DashboardPage} />
      <Route exact path="/purchase/select-a-plan" component={SelectAPlan} />
      <Route exact path="/purchase/configure" component={ConfigurePlan} /> */}
      <Route path="/login" element={<Login />} />
      {/* <Route exact path="/purchase/create-account" component={CreateAccount} />
      <Route exact path="/purchase/confirm" component={PurchaseConfirm} />
      <Route
        exact
        path="/purchase/payment-details"
        component={PaymentDetails}
      />
      <Route component={Landing} /> */}
    </Routes>
  );
};
