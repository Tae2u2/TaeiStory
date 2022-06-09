import React, { useEffect, useState } from "react";
import axios from "axios";
import cookie from "react-cookies";
import { useNavigate } from "react-router-dom";

const AuthCheck = (props) => {
  const navigate = useNavigate();
  const [userid, setUserid] = useState("");

  const handleAuth = async () => {
    const response = await axios.post("/api/register?type=authuser", {
      is_Useremail: userid,
    });
    console.log(response.data);
    if (response.data === "succ") {
      props.setIsLoggedIn(true);
      navigate("/piggy", { replace: true });
    }
  };

  useEffect(() => {
    async function axiosData() {
      const response = await axios.post("/api/LoginForm?type=SessionConfirm", {
        token1: cookie.load("userid"),
      });
      setUserid(response.data.token1);
    }
    axiosData();
  }, []);
  return (
    <div className="for-flex">
      <div className="user-box">
        <h2 className="user-h2">이메일 인증</h2>
        <h4>가입을 환영합니다!</h4>
        <button onClick={handleAuth}>인증확인</button>
      </div>
    </div>
  );
};

export default AuthCheck;
