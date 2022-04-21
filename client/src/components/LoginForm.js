import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import axios from "axios";
import cookie from "react-cookies";
import Swal from "sweetalert2";
import Introduce from "./Introduce";

const LoginForm = (props) => {
  const inputRef = useRef();
  const inputPassRef = useRef();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChange = (event) => {
    if (event.target.name === "email") {
      setEmail(inputRef.current.value);
    } else {
      setPassword(inputPassRef.current.value);
    }
  };

  const onsubmit = async (event) => {
    event.preventDefault();
    if (email === "" || password === "") {
      saveAlert("아이디와 비밀번호를 입력해주세요", "center");
      return false;
    } else {
      try {
        const response = await axios.post("/api/register?type=onlyoneCheck", {
          is_Email: email,
        });
        if (response.data.json[0].num === 0) {
          const sayYes = await Swal.fire({
            title: "가입되지 않은 이메일입니다. 회원가입하시겠습니까?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#2f0059",
            cancelButtonColor: "#90b029",
            confirmButtonText: "예",
            cancelButtonText: "아니요",
          });
          if (sayYes.isConfirmed) {
            navigate("/register", { replace: true });
          }
        } else {
          const response = await axios.post("/api/LoginForm?type=signin", {
            is_Email: email,
            is_Password: password,
          });

          const userName = response.data.json[0].username;
          const userEmail = response.data.json[0].useremail;

          const upw = response.data.json[0].userpassword;
          props.setIsLoggedIn(true);

          const expires = new Date();
          expires.setHours(expires.getHours() + 12);

          const response2 = await axios.post(
            "api/LoginForm?type=SessionState",
            {
              is_Email: userEmail,
              is_UserName: userName,
            }
          );

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
          navigate("/piggy", { replace: true });
        }
      } catch (error) {
        saveAlert("죄송합니다. 로그인을 다시 시도해주세요!", "center");
      }
    }
  };

  const saveAlert = (flag, positionflag) => {
    Swal.fire({
      position: positionflag,
      icon: "success",
      title: flag,
      showConfirmButton: false,
      timer: 1000,
    });
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="for-flex">
      <div className="user-box">
        <h2 className="user-h2">LOGIN</h2>
        <div className="user-form-box">
          <form onSubmit={onsubmit} className="user-form">
            <div className="for-flex2">
              <label className="user-label" id="email_val">
                이메일
              </label>
              <input
                type="text"
                id="email_val"
                name="email"
                className="user-input"
                value={email}
                placeholder="이메일"
                ref={inputRef}
                onChange={onChange}
              />
            </div>
            <br />
            <div className="for-flex2">
              <label className="user-label" id="pwd_val">
                비밀번호
              </label>
              <input
                type="password"
                id="pwd_val"
                name="password"
                className="user-input"
                ref={inputPassRef}
                placeholder="비밀번호"
                onChange={onChange}
              />
            </div>
            <br />
            <input className="user-btn" type="submit" value="로그인" />
          </form>
          <br />
          <span className="go-register">
            <Link to="/register">아직 회원이 아니신가요?</Link>
          </span>
        </div>
      </div>
      <Introduce />
    </div>
  );
};

export default LoginForm;
