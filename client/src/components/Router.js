import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./LoginForm";
import PiggyBoss from "./PiggyBoss";
import { useState } from "react";

import RegisterUser from "./RegisterUser";
import AdminPage from "./AdminPage";

function AppRouter(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<LoginForm setIsLoggedIn={setIsLoggedIn} />}
        ></Route>
        <Route
          path="/piggy"
          element={<PiggyBoss isLoggedIn={isLoggedIn} />}
        ></Route>
        <Route path="/register" element={<RegisterUser />}></Route>
        <Route path="/adminpage" element={<AdminPage />}></Route>
      </Routes>
    </Router>
  );
}

export default AppRouter;
