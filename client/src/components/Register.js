import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import $ from "jquery";

const Register = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordCheck, setUserPasswordCheck] = useState("");
  const [userName, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pwcheck, setPwcheck] = useState(false);
  const [isUser, setisUser] = useState(false);

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    switch (name) {
      case "is_Useremail":
        setUserEmail(value);
        break;
      case "is_Password":
        setUserPassword(value);
        break;
      case "is_Password_check":
        setUserPasswordCheck(value);
        handleCheck();
        break;
      case "is_Username":
        return setUsername(value);
        break;
      case "is_Userphone":
        return setPhoneNumber(value);
        break;
    }
  };

  const handleCheck = () => {
    if (userPassword === userPasswordCheck) {
      setPwcheck(true);
    } else {
      setPwcheck(false);
    }
  };
  const onSubmit = async (event, type) => {
    event.preventDefault();
    let jsonstr = $("form[name='frm']").serialize();
    jsonstr = decodeURIComponent(jsonstr);
    let Json_form = JSON.stringify(jsonstr).replace(/\"/gi, "");
    Json_form =
      '{"' + Json_form.replace(/\&/g, '","').replace(/=/gi, '":"') + '"}';

    try {
      const response = await fetch("/api/register?type=" + type, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: Json_form,
      });
      alert("환영합니다!");
      setisUser(true);
      navigate("/", { replace: true });
    } catch (error) {
      alert("죄송합니다. 다시 시도해주세요!");
      return false;
    }
  };

  return (
    <div>
      <h2>회원가입</h2>
      <form method="post" name="frm" onSubmit={(e) => onSubmit(e, "signup")}>
        <label id="email_val">이메일</label>
        <input
          id="email_val"
          type="text"
          value={userEmail}
          name="is_Useremail"
          onChange={onChange}
          placeholder="이메일을 입력해주세요."
        />
        <br />
        <label id="pwd_val">비밀번호</label>
        <input
          id="pwd_val"
          type="password"
          value={userPassword}
          name="is_Password"
          onChange={onChange}
          placeholder="비밀번호를 입력해주세요."
        />
        <br />
        <label id="pwd_cnf_val">비밀번호 확인</label>
        <input
          id="pwd_cnf_val"
          className={pwcheck ? "greenLine" : "redLine"}
          type="password"
          name="is_Password_check"
          onChange={onChange}
          placeholder="비밀번호를 다시 입력해주세요."
        />
        <br />
        <label id="name_val">이름</label>
        <input
          id="name_val"
          type="text"
          name="is_Username"
          onChange={onChange}
          value={userName}
          placeholder="성명을 입력해주세요."
        />
        <br />
        <label id="phone_val">연락처</label>
        <input
          id="phone_val"
          name="is_Userphone"
          type="text"
          value={phoneNumber}
          onChange={onChange}
        />
        <br />
        <input type="submit" value="회원가입" />
      </form>
    </div>
  );
};

export default Register;
