import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

import Swal from "sweetalert2";
import "../css/user.scss";

const RegisterUser = ({ authMail }) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const is_Password = useRef();
  is_Password.current = watch("is_Password");

  const saveAlert = (flag, positionflag) => {
    Swal.fire({
      position: positionflag,
      icon: "success",
      title: flag,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const onSubmit = async (data) => {
    const userdata = JSON.stringify(data);
    try {
      const response = await axios.post("/api/register?type=onlyoneCheck", {
        is_Email: data.is_Useremail,
      });
      if (response.data.json[0].num === 0) {
        const response2 = await fetch("/api/register?type=signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: userdata,
        });
        const checkSuc = await response2.text();
        if (checkSuc === "succ") {
          saveAlert("환영합니다!", "center");
          navigate("/", { replace: true });
        } else {
          saveAlert("죄송합니다. 다시 시도해주세요.", "center");
          return false;
        }
      } else {
        alert("이미 가입된 계정입니다. 로그인 해주세요!");
        navigate("/", { replace: true });
      }
    } catch (error) {
      saveAlert("죄송합니다. 다시 시도해주세요.", "center");
      return false;
    }
  };

  return (
    <div>
      <form
        className="user-form-box"
        method="post"
        name="frm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="for-flex2">
          <label className="user-label">메일주소</label>
          <input
            id="email_val"
            type="email"
            value={authMail}
            readOnly
            className="user-input"
            name="is_Useremail"
            {...register("is_Useremail", {
              required: true,
              pattern: /\w/,
            })}
            placeholder="이메일을 입력해주세요."
          />
        </div>
        {errors.is_Useremail && errors.is_Useremail.type === "required" && (
          <small>필수입력사항입니다.</small>
        )}
        {errors.is_Useremail && errors.is_Useremail.type === "pattern" && (
          <small>영문+숫자 조합으로 입력해주세요.</small>
        )}
        <br />
        <div className="for-flex2">
          <label className="user-label">비밀번호</label>
          <input
            id="pwd_val"
            type="password"
            className="user-input"
            name="is_Password"
            placeholder="비밀번호를 입력해주세요."
            {...register("is_Password", {
              required: true,
              pattern: /\w{9,16}$/,
            })}
          />
        </div>
        {errors.is_Password && errors.is_Password.type === "required" && (
          <small>필수 입력사항입니다.</small>
        )}
        {errors.is_Password && errors.is_Password.type === "pattern" && (
          <small>영문+숫자 조합 9자 이상으로 만들어야합니다. </small>
        )}
        <br />

        <div className="for-flex2">
          <label className="user-label2">비밀번호 확인</label>
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
          <label className="user-label">별명</label>
          <input
            id="name_val"
            type="text"
            className="user-input"
            name="is_Username"
            {...register("is_Username", { required: true, maxLength: 20 })}
            placeholder="별명을 입력해주세요."
          />
        </div>
        {errors.is_Username && errors.is_Username.type === "required" && (
          <small>필수 입력사항입니다.</small>
        )}
        {errors.is_Username && errors.is_Username.type === "maxLength" && (
          <small>20자 이하로 입력해주세요!</small>
        )}
        <br />
        <input
          type="submit"
          className="user-btn"
          style={{ marginBottom: "0px" }}
          value="회원가입"
        />
      </form>
    </div>
  );
};

export default RegisterUser;
