import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import cookie from "react-cookies";
import Swal from "sweetalert2";
import "../css/user.scss";
import FindIdPass from "components/FindIdPass";

const LoginForm = () => {
  const inputRef = useRef();
  const inputPassRef = useRef();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          alert("가압되지 않은 계정입니다. 회원가입 해주세요");
          navigate("/register", { replace: true });
        } else {
          const response = await axios.post("/api/LoginForm?type=signin", {
            is_Email: email,
            is_Password: password,
          });

          const userName = response.data.json[0].username;
          const userEmail = response.data.json[0].useremail;
          const userFlag = response.data.json[0].userflag;

          const upw = response.data.json[0].userpassword;

          const expires = new Date();
          expires.setHours(expires.getHours() + 12);

          const response2 = await axios.post(
            "api/LoginForm?type=SessionState",
            {
              is_Email: userEmail,
              is_UserName: userName,
              is_UserFlag: userFlag,
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
          cookie.save("userflag", response2.data.token3, {
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
        saveAlert("id와 비밀번호를 다시 확인해주세요!", "center");
      }
    }
  };

  const saveAlert = (flag, positionflag) => {
    Swal.fire({
      position: positionflag,
      icon: "success",
      title: flag,
      showConfirmButton: false,
      timer: 2000,
    });
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="user-form-box">
      <h2 className="user-h2">로그인</h2>
      <form onSubmit={onsubmit} className="user-form">
        <div className="for-flex2">
          <label className="user-label3">이메일</label>
          <input
            type="text"
            id="email_val"
            name="email"
            className="user-input"
            value={email}
            placeholder="이메일"
            ref={inputRef}
            onChange={() => setEmail(inputRef.current.value)}
          />
        </div>
        <br />
        <div className="for-flex2">
          <label className="user-label3">비밀번호</label>
          <input
            type="password"
            id="pwd_val"
            name="password"
            className="user-input"
            ref={inputPassRef}
            placeholder="비밀번호"
            onChange={() => setPassword(inputPassRef.current.value)}
          />
        </div>
        <br />
        <input className="user-btn" type="submit" value="로그인" />
      </form>
      <FindIdPass />
      <span>
        아직 회원이 아니시라면 회원가입을 통해
        <br /> 돼지짱 회원이 되어주세요!
      </span>
      <Link to="/register">
        <button className="user-btn">회원가입하기</button>
      </Link>
    </div>
  );
};

export default LoginForm;
