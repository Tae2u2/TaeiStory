import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
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
        <label id="name_val">별명</label>
        <input
          id="name_val"
          type="text"
          name="is_Username"
          {...register("is_Username", { required: true, maxLength: 10 })}
          placeholder="별명을 입력해주세요."
        />
        {errors.is_Username && errors.is_Username.type === "required" && (
          <p>필수 입력사항입니다.</p>
        )}
        {errors.is_Username && errors.is_Username.type === "maxLength" && (
          <p>이름을 다시 확인해주세요!</p>
        )}
        <br />
        <input type="submit" value="회원가입" />
      </form>
    </div>
  );
};

export default RegisterUser;
