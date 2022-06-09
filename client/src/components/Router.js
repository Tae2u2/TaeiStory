import React, { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import LoginForm from "../Routes/LoginForm";
import PiggyBoss from "../Routes/PiggyBoss";
import RegisterUser from "../Routes/RegisterUser";
import AdminPage from "../Routes/AdminPage";
import Auth from "Routes/Auth";
import AuthCheck from "Routes/AuthCheck";

function AppRouter(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />}></Route>
        <Route
          path="/piggy"
          element={<PiggyBoss isLoggedIn={isLoggedIn} />}
        ></Route>
        <Route
          path="/authcheck"
          element={<AuthCheck setIsLoggedIn={setIsLoggedIn} />}
        ></Route>
        <Route path="/adminpage" element={<AdminPage />}></Route>
      </Routes>
    </Router>
  );
}

export default AppRouter;
