import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import Introduce from "./Introduce";

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

  const saveAlert = (flag, positionflag) => {
    Swal.fire({
      position: positionflag,
      icon: "success",
      title: flag,
      showConfirmButton: false,
      timer: 1000,
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
        const sayYes = await Swal.fire({
          title: "이미 가입된 이메일입니다. 로그인화면으로 이동하시겠습니까?",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#2f0059",
          cancelButtonColor: "#90b029",
          confirmButtonText: "예",
          cancelButtonText: "아니요",
        });
        if (sayYes.isConfirmed) {
          navigate("/", { replace: true });
        }
      }
    } catch (error) {
      saveAlert("죄송합니다. 다시 시도해주세요.", "center");
      return false;
    }
  };

  return (
    <div className="for-flex">
      <div className="user-box">
        <h2 className="user-h2">회원가입</h2>
        <form
          method="post"
          name="frm"
          encType="multipart/form-data"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="for-flex2">
            <label id="email_val" className="user-label">
              이메일
            </label>
            <input
              id="email_val"
              type="text"
              className="user-input"
              name="is_Useremail"
              {...register("is_Useremail", {
                required: true,
                pattern:
                  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
              })}
              placeholder="ex)yourEmail@email.com"
            />
          </div>
          {errors.is_Useremail && errors.is_Useremail.type === "required" && (
            <small>필수입력사항입니다.</small>
          )}
          {errors.is_Useremail && errors.is_Useremail.type === "pattern" && (
            <small>이메일을 정확하게 입력해주세요</small>
          )}
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
            <small>10자 이하로 입력해주세요!</small>
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
      <Introduce />
    </div>
  );
};

export default RegisterUser;
