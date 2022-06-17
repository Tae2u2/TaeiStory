import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import PiggyBoss from "../Routes/PiggyBoss";
import AdminPage from "../Routes/AdminPage";
import LoginForm from "../Routes/LoginForm";
import EmailAuth from "../Routes/EmailAuth";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />}></Route>
        <Route path="/register" element={<EmailAuth />}></Route>
        <Route path="/piggy" element={<PiggyBoss />}></Route>
        <Route path="/admin" element={<AdminPage />}></Route>
      </Routes>
    </Router>
  );
}

export default AppRouter;
