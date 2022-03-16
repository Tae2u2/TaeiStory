import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import cookie from "react-cookies";

const LoginForm = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userInfo, setUserInfo] = useState(null);

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

  const onsubmit = async (event) => {
    event.preventDefault();
    if (email === "" || password === "") {
      alert("아이디와 비밀번호를 입력해주세요");
      return false;
    } else {
      try {
        const response = await axios.post("/api/LoginForm?type=signin", {
          is_Email: email,
          is_Password: password,
        });
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
        props.setIsLoggedIn(true);

        const expires = new Date();
        expires.setHours(expires.getHours() + 12);

        const response2 = await axios.post("api/LoginForm?type=SessionState", {
          is_Email: userEmail,
          is_UserName: userName,
        });

        cookie.save("userid", response2.data.token1, {
          path: "/",
          expires,
        });
        cookie.save("username", response2.data.token2, {
          path: "/",
          expires,
        });
        cookie.save("userpassword", upw, {
          path: "/",
          expires,
        });
        if (userInfo != null) {
          navigate("/piggy", { replace: true });
        }
      } catch (error) {
        alert("죄송합니다. 로그인을 다시 시도해주세요!");
      }
    }
  };

  return (
    <div className="login-box">
      <h2 className="login-h3">LOGIN</h2>
      <div className="login-form-box">
        <form onSubmit={onsubmit} className="login-form">
          <div className="for-flex">
            <label className="login-label" id="email_val">
              이메일
            </label>
            <input
              type="text"
              className="login-input"
              name="email"
              id="email_val"
              value={email}
              onChange={onChange}
              placeholder="이메일"
            />
          </div>
          <br />
          <div className="for-flex">
            <label className="login-label" id="pwd_val">
              비밀번호
            </label>
            <input
              type="password"
              className="login-input"
              id="pwd_val"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="비밀번호"
            />
          </div>
          <br />
          <input className="login-btn" type="submit" value="로그인" />
        </form>
        <span className="go-register">
          <Link to="/register">아직 회원이 아니신가요?</Link>
        </span>
      </div>
    </div>
  );
};

export default LoginForm;
