import React, { Suspense } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import PiggyBoss from "../Routes/PiggyBoss";
import AdminPage from "../Routes/AdminPage";
import LoginForm from "../Routes/LoginForm";
import EmailAuth from "../Routes/EmailAuth";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<h1>비행기 이륙준비중...</h1>}>
              <LoginForm />
            </Suspense>
          }
        ></Route>
        <Route path="/register" element={<EmailAuth />}></Route>
        <Route
          path="/piggy"
          element={
            <Suspense fallback={<h1>비행기 이륙준비중...</h1>}>
              <PiggyBoss />
            </Suspense>
          }
        ></Route>
        <Route path="/admin" element={<AdminPage />}></Route>
      </Routes>
    </Router>
  );
}

export default AppRouter;
