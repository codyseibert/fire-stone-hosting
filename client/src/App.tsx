import React from "react";
import { AppRouter } from "./AppRouter";
import Navigation from "./components/Navigation";
import { BrowserRouter } from "react-router-dom";

export const App = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <AppRouter />
    </BrowserRouter>
  );
};

export default App;
