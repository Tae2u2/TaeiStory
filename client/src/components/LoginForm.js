import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import PiggyBoss from "./PiggyBoss";
import cookie from "react-cookies";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onsubmit = (event) => {
    event.preventDefault();
    try {
      axios
        .post("/api/LoginForm?type=signin", {
          is_Email: email,
          is_Password: password,
        })
        .then((response) => {
          const userName = response.data.json[0].username;
          const userEmail = response.data.json[0].useremail;
          const userPhone = response.data.json[0].userphone;
          setUserInfo({
            userName: userName,
            userEmail: userEmail,
            userPhone: userPhone,
          });
          console.log(userInfo);
          const upw = response.data.json[0].userpassword;
          setIsLoggedIn(true);

          const expires = new Date();
          expires.setHours(expires.getHours() + 12);

          axios
            .post("api/LoginForm?type=SessionState", {
              is_Email: userEmail,
              is_UserName: userName,
            })
            .then((response) => {
              cookie.save("userid", response.data.token1, {
                path: "/",
                expires,
              });
              cookie.save("username", response.data.token2, {
                path: "/",
                expires,
              });
              cookie.save("userpassword", upw, {
                path: "/",
                expires,
              });
            });
        });
    } catch (error) {
      alert("죄송합니다. 로그인을 다시 시도해주세요!");
    }
  };
  useEffect(() => {
    if (userInfo !== null) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <PiggyBoss userInfo={userInfo} />
      ) : (
        <div>
          <h3>LOGIN</h3>
          <div>
            <form onSubmit={onsubmit}>
              <label id="email_val">이메일</label>
              <input
                type="text"
                name="email"
                id="email_val"
                value={email}
                onChange={onChange}
                placeholder="이메일"
              />
              <br />
              <label id="pwd_val">비밀번호</label>
              <input
                type="password"
                id="pwd_val"
                name="password"
                value={password}
                onChange={onChange}
                placeholder="비밀번호"
              />
              <br />
              <input type="submit" value="로그인" />
            </form>
            <span>
              <Link to="/register">아직 회원이 아니신가요?</Link>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
