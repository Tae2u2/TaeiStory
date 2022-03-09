import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./LoginForm";
import PiggyBoss from "./PiggyBoss";
import RegisterUser from "./RegisterUser";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/piggy" element={<PiggyBoss />}></Route>
        <Route path="/" element={<LoginForm />}></Route>
        <Route path="/register" element={<RegisterUser />}></Route>
      </Routes>
    </Router>
  );
}

export default AppRouter;
