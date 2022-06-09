import React, { useEffect, useState } from "react";
import axios from "axios";
import cookie from "react-cookies";
import Introduce from "components/Introduce";
import LoginForm from "./LoginForm";
import RegisterUser from "./RegisterUser";

const Auth = () => {
  const [changeForm, setChangeForm] = useState(false);
  const handleForm = () => {
    if (changeForm) {
      setChangeForm(false);
    } else {
      setChangeForm(true);
    }
  };
  return (
    <div className="for-flex">
      <div className="user-box">
        {changeForm ? <LoginForm /> : <RegisterUser />}
        <button onClick={handleForm}>
          {changeForm ? "계정생성" : "로그인"}
        </button>
        <Introduce />
      </div>
    </div>
  );
};

export default Auth;
