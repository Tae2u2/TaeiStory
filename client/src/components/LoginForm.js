import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const LoginForm = () => {
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

  const onsubmit = (event) => {
    event.preventDefault();
    try {
      axios
        .post("/api/LoginForm?type=signin", {
          is_Email: email,
          is_Password: password,
        })
        .then((response) => {
          console.log(response.data.json[0]);
          setUserInfo({
            username: response.data.json[0].username,
            useremail: response.data.json[0].useremail,
            userpassword: response.data.json[0].userpassword,
            userphone: response.data.json[0].userphone,
          });
          console.log(userInfo);
          navigate("/piggy", { replace: true });
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
  );
};

export default LoginForm;
