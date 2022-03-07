import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import { useForm } from "react-hook-form";

const RegisterUser = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const is_Password = useRef();
  is_Password.current = watch("is_Password");

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordCheck, setUserPasswordCheck] = useState("");
  const [userName, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isUser, setisUser] = useState(false);

  /* const onChange = (event) => {
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
        break;
      case "is_Username":
        return setUsername(value);
        break;
      case "is_Userphone":
        return setPhoneNumber(value);
        break;
    }
  }; */

  const onSubmit = async (data) => {
    const userdata = JSON.stringify(data);
    console.log(userdata);
    try {
      const response = await fetch("/api/register?type=signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: userdata,
      });
      const checkSuc = await response.text();
      console.log(checkSuc);
      if (checkSuc === "OK") {
        alert("환영합니다!");
        // navigate("/", { replace: true });
      } else {
        alert("선화화이팅");
      }
    } catch (error) {
      alert("죄송합니다. 다시 시도해주세요!");
      return false;
    }
  };

  return (
    <div>
      <h2>회원가입</h2>
      <form method="post" name="frm" onSubmit={handleSubmit(onSubmit)}>
        <label id="email_val">이메일</label>
        <input
          id="email_val"
          type="text"
          name="is_Useremail"
          {...register("is_Useremail", {
            required: true,
            pattern: /^\S+@\S+$/i,
          })}
          placeholder="ex)yourEmail@email.com"
        />
        {errors.is_Useremail && <p>이메일을 다시 확인해주세요!</p>}
        <br />
        <label id="pwd_val">비밀번호</label>
        <input
          id="pwd_val"
          type="password"
          name="is_Password"
          placeholder="비밀번호를 입력해주세요."
          {...register("is_Password", { required: true, minLength: 9 })}
        />
        {errors.is_Password && errors.is_Password.type === "required" && (
          <p>필수 입력사항입니다.</p>
        )}
        {errors.is_Password && errors.is_Password.type === "minLength" && (
          <p>영문+숫자 조합 9자 이상으로 만들어야합니다. </p>
        )}

        <br />
        <label id="pwd_cnf_val">비밀번호 확인</label>
        <input
          id="pwd_cnf_val"
          type="password"
          name="is_Password_check"
          placeholder="비밀번호를 다시 입력해주세요."
          {...register("is_Password_check", {
            required: true,
            validate: (value) => value === is_Password.current,
          })}
        />
        {errors.is_Password_check &&
          errors.is_Password_check.type === "required" && (
            <p>비밀번호를 확인해주세요!</p>
          )}
        {errors.is_Password_check &&
          errors.is_Password_check.type === "validate" && (
            <p>입력하신 비밀번호와 같지 않습니다.</p>
          )}
        <br />
        <label id="name_val">이름</label>
        <input
          id="name_val"
          type="text"
          name="is_Username"
          {...register("is_Username", { required: true, maxLength: 10 })}
          placeholder="이름을 입력해주세요."
        />
        {errors.is_Username && errors.is_Username.type === "required" && (
          <p>필수 입력사항입니다.</p>
        )}
        {errors.is_Username && errors.is_Username.type === "maxLength" && (
          <p>이름을 다시 확인해주세요!</p>
        )}
        <br />
        <label id="phone_val">연락처</label>
        <input
          id="phone_val"
          name="is_Userphone"
          type="text"
          {...register("is_Userphone", {
            minLength: 10,
          })}
        />
        {errors.is_Userphone && (
          <p>연락처를 바르게 입력해주세요. 숫자만 입력가능합니다.</p>
        )}
        <br />
        <input type="submit" value="회원가입" />
      </form>
    </div>
  );
};

export default RegisterUser;
