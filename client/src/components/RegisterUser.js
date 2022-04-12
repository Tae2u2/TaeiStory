import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

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

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "is_Useremail") {
      setUserEmail(value);
    }
  };

  const onSubmit = async (data) => {
    const userdata = JSON.stringify(data);
    try {
      const response = await fetch("/api/register?type=signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: userdata,
      });
      const checkSuc = await response.text();
      if (checkSuc === "succ") {
        alert("환영합니다!");
        navigate("/", { replace: true });
      } else {
        alert("죄송합니다.");
        return false;
      }
    } catch (error) {
      alert("죄송합니다. 다시 시도해주세요!");
      return false;
    }
  };

  return (
    <div className="user-box">
      <h2 className="user-h2">회원가입</h2>
      <form method="post" name="frm" onSubmit={handleSubmit(onSubmit)}>
        <div className="for-flex2">
          <label id="email_val" className="user-label">
            이메일
          </label>
          <input
            onChange={onChange}
            id="email_val"
            type="text"
            className="user-input"
            name="is_Useremail"
            {...register("is_Useremail", {
              required: true,
              pattern: /^\S+@\S+$/i,
            })}
            placeholder="ex)yourEmail@email.com"
          />
        </div>
        {errors.is_Useremail && <small>이메일을 다시 확인해주세요!</small>}
        <br />
        <div className="for-flex2">
          <label id="pwd_val" className="user-label">
            비밀번호
          </label>
          <input
            id="pwd_val"
            type="password"
            className="user-input"
            name="is_Password"
            placeholder="비밀번호를 입력해주세요."
            {...register("is_Password", { required: true, minLength: 9 })}
          />
        </div>
        {errors.is_Password && errors.is_Password.type === "required" && (
          <small>필수 입력사항입니다.</small>
        )}
        {errors.is_Password && errors.is_Password.type === "minLength" && (
          <small>영문+숫자 조합 9자 이상으로 만들어야합니다. </small>
        )}
        <br />

        <div className="for-flex2">
          <label id="pwd_cnf_val" className="user-label">
            비밀번호 확인
          </label>
          <input
            id="pwd_cnf_val"
            type="password"
            className="user-input"
            name="is_Password_check"
            placeholder="비밀번호를 확인해주세요."
            {...register("is_Password_check", {
              required: true,
              validate: (value) => value === is_Password.current,
            })}
          />
        </div>
        {errors.is_Password_check &&
          errors.is_Password_check.type === "required" && (
            <small>비밀번호를 확인해주세요!</small>
          )}
        {errors.is_Password_check &&
          errors.is_Password_check.type === "validate" && (
            <small>입력하신 비밀번호와 같지 않습니다.</small>
          )}
        <br />

        <div className="for-flex2">
          <label id="name_val" className="user-label">
            별명
          </label>
          <input
            id="name_val"
            type="text"
            className="user-input"
            name="is_Username"
            {...register("is_Username", { required: true, maxLength: 10 })}
            placeholder="별명을 입력해주세요."
          />
        </div>
        {errors.is_Username && errors.is_Username.type === "required" && (
          <small>필수 입력사항입니다.</small>
        )}
        {errors.is_Username && errors.is_Username.type === "maxLength" && (
          <small>이름을 다시 확인해주세요!</small>
        )}
        <br />
        <input
          type="submit"
          className="user-btn"
          style={{ marginBottom: "0px" }}
          value="회원가입"
        />
      </form>
      <span className="go-register">
        <Link to="/">이미 회원이신가요?</Link>
      </span>
    </div>
  );
};

export default RegisterUser;
