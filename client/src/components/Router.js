import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./LoginForm";
import PiggyBoss from "./PiggyBoss";
import Register from "./Register";

function AppRouter() {
  const isLoggedIn = false;
  return (
    <Router>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<PiggyBoss />}></Route>
          </>
        ) : (
          <Route path="/" element={<LoginForm />}></Route>
        )}
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </Router>
  );
}

export default AppRouter;
