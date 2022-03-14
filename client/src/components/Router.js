import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./LoginForm";

import RegisterUser from "./RegisterUser";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />}></Route>
        <Route path="/register" element={<RegisterUser />}></Route>
      </Routes>
    </Router>
  );
}

export default AppRouter;
