import React, { useState } from "react";
import axios from "axios";
import RegisterUser from "components/RegisterUser";

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
    console.log(number);
    console.log(authNum);
    if (number == authNum) {
      const response = await axios.post("/api/register?type=authuser", {
        is_Useremail: authMail,
      });
      if (response.data === "succ") {
        console.log(response);

        setHidden("C");
      }
    } else {
      alert("번호를 잘못 입력하셨습니다. 다시 시도해주세요!");
      setHidden("A");
    }
  };
  return (
    <div>
      <div className={hidden === "C" ? "auth-div erase" : "auth-div"}>
        {hidden === "B" ? (
          <div>
            <input type="text" onChange={(e) => setAuthNum(e.target.value)} />
            <button type="button" onClick={handleAuthCheck}>
              확인
            </button>
          </div>
        ) : (
          <>
            <input type="email" onChange={(e) => setAuthMail(e.target.value)} />
            <button type="button" onClick={handleEmailAuth}>
              이메일 인증하기
            </button>
          </>
        )}
      </div>
      {hidden === "C" && <RegisterUser authMail={authMail} />}
    </div>
  );
};

export default EmailAuth;
