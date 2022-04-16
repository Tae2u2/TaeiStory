import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./LoginForm";
import PiggyBoss from "./PiggyBoss";
import { useState, useEffect } from "react";
import axios from "axios";
import cookie from "react-cookies";
import RegisterUser from "./RegisterUser";
import AdminPage from "./AdminPage";

function AppRouter(props) {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    try {
      axios
        .post("/api/LoginForm?type=SessionConfirm", {
          token1: cookie.load("userid"),
          token2: cookie.load("username"),
        })
        .then((response) => {
          const userid = response.data.token1;
          let password = cookie.load("userpassword");

          if (password !== undefined) {
            axios
              .post("/api/LoginForm?type=SessionSignin", {
                is_Email: userid,
                is_Token: password,
              })
              .then((response) => {
                if (response.data.json[0].useremail === undefined) {
                  noPermission();
                } else {
                  setUserInfo({
                    userName: response.data.json[0].username,
                    userEmail: response.data.json[0].useremail,
                    userPhone: response.data.json[0].userphone,
                  });
                }
              })
              .catch((error) => {
                noPermission();
              });
          }
        });
    } catch (error) {
      noPermission();
    }
  }, []);

  const noPermission = (e) => {
    if (window.location.hash !== "nocookie") {
      remove_cookie();
      window.location.href = "/";
    }
  };

  const remove_cookie = (e) => {
    cookie.remove("userid", { path: "/" });
    cookie.remove("username", { path: "/" });
    cookie.remove("userpassword", { path: "/" });
  };
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<LoginForm setIsLoggedIn={setIsLoggedIn} />}
        ></Route>
        <Route
          path="/piggy"
          element={<PiggyBoss isLoggedIn={isLoggedIn} userInfo={userInfo} />}
        ></Route>
        <Route path="/register" element={<RegisterUser />}></Route>
        <Route path="/adminpage" element={<AdminPage />}></Route>
      </Routes>
    </Router>
  );
}

export default AppRouter;
