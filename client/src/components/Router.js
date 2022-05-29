import React, { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import LoginForm from "../Routes/LoginForm";
import PiggyBoss from "../Routes/PiggyBoss";
import RegisterUser from "../Routes/RegisterUser";
import AdminPage from "../Routes/AdminPage";

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
