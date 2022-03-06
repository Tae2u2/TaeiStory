import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const onsubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <h3>LOGIN</h3>
      <div>
        <div>
          <input type="text" id="email_val" placeholder="이메일" />
        </div>
        <div>
          <input type="password" id="pwd_val" placeholder="비밀번호" />
        </div>
        <button>
          <Link to="/register">회원가입</Link>
        </button>
        <input type="submit" onClick={onsubmit} value="로그인" />
      </div>
    </div>
  );
};

export default LoginForm;
