import React, { useState } from "react";
import axios from "axios";
import RegisterUser from "components/RegisterUser";
import { Link } from "react-router-dom";

const EmailAuth = () => {
  const [authNum, setAuthNum] = useState("");
  const [authMail, setAuthMail] = useState("");
  const [number, setNumber] = useState("");
  const [hidden, setHidden] = useState("A");

  const handleEmailAuth = async () => {
    const response3 = await axios.post("/api/mail", {
      is_Email: authMail,
    });
    setNumber(response3.data.randomNum);
    setHidden("B");
  };

  const handleAuthCheck = async () => {
    if (number == authNum) {
      const response = await axios.post("/api/register?type=authuser", {
        is_Useremail: authMail,
      });
      if (response.data === "succ") {
        setHidden("C");
      }
    } else {
      alert("번호를 잘못 입력하셨습니다. 다시 시도해주세요!");
      setHidden("A");
    }
  };
  return (
    <div className="auth-box">
      <h2 className="user-h2">회원가입</h2>
      <br />
      <div className={hidden === "C" ? "auth-div erase" : "auth-div"}>
        {hidden === "B" ? (
          <div>
            <label htmlFor="auth-num">
              이메일로 받으신 인증번호를 입력해주세요!
            </label>
            <input
              type="number"
              name="auth-num"
              value={authNum}
              placeholder="인증번호를 입력해주세요."
              onChange={(e) => setAuthNum(e.target.value)}
            />
            <button
              type="button"
              className="user-btn"
              onClick={handleAuthCheck}
            >
              확인
            </button>
          </div>
        ) : (
          <div className="auth-box">
            <label htmlFor="auth-mail">
              입력하신 이메일로 인증번호가 전송됩니다.
            </label>
            <input
              type="email"
              value={authMail}
              name="auth-mail"
              placeholder="이메일을 입력해주세요."
              onChange={(e) => setAuthMail(e.target.value)}
            />
            <br />
            <p>
              이메일 전송에 시간이 걸릴 수 있습니다.
              <br />
              3분이 지나도 이메일을 받지 못하시면 재시도 해주세요.
            </p>
            <button
              type="button"
              className="user-btn"
              onClick={handleEmailAuth}
            >
              이메일 인증하기
            </button>
          </div>
        )}
      </div>
      {hidden === "C" && <RegisterUser authMail={authMail} />}
      <br />
      <Link to="/">
        <span>로그인 화면으로 돌아가기</span>
      </Link>
    </div>
  );
};

export default EmailAuth;
