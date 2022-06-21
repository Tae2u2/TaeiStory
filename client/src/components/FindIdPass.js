import axios from "axios";
import React, { useState } from "react";

const FindIdPass = () => {
  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [movePage, setMovePage] = useState("A");
  const [enteredNum, setEnteredNum] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  const handleFindEmailId = async () => {
    const response = await axios.post("/api/register?type=onlyoneCheck", {
      is_Email: email,
    });
    if (response.data.json[0].num === 1) {
      const response = await axios.post("/api/mail", {
        is_Email: email,
      });
      setNumber(response.data.randomNum);
      setMovePage("B");
    } else {
      alert("가입되지 않은 이메일입니다.");
      setEmail("");
      setOpenModal(!openModal);
    }
  };

  const handleModalClosing = () => {
    const sayYes = window.confirm(
      "지금 창을 벗어나시면 처음부터 다시 시도해야 합니다. 창을 닫으시겠습니까?"
    );
    if (sayYes) {
      setOpenModal(!openModal);
      setMovePage("A");
      setEnteredNum("");
      setEmail("");
      setPassword("");
      setCheckPassword("");
    }
  };

  const handleCheckNum = () => {
    if (enteredNum == number) {
      setMovePage("C");
    } else {
      alert("인증번호를 잘못입력하셨습니다.");
      setMovePage("A");
      setEnteredNum("");
      setEmail("");
    }
  };

  const handleEditPW = async () => {
    if (password === checkPassword) {
      const response = await axios.post("/api/register?type=pwdmodify", {
        is_Password: password,
        is_Useremail: email,
      });
      if (response.data === "succ") {
        alert("비밀번호가 변경되었습니다.");
        setPassword("");
        setCheckPassword("");
        setOpenModal(!openModal);
      }
    } else {
      alert("입력하신 비밀번호가 일치하지 않습니다.");
    }
  };

  return (
    <div>
      <button className="user-btn" onClick={() => setOpenModal(!openModal)}>
        비밀번호 찾기
      </button>
      {openModal && (
        <div className="find-pass-box">
          <span onClick={handleModalClosing}>닫기</span>
          {movePage === "A" && (
            <div className="find-pass-modal">
              <label htmlFor="find-id">
                이메일 인증을 진행해주세요!
                <br />
                입력하신 이메일로 인증번호를 보내드립니다.
              </label>
              <br />
              <input
                type="text"
                name="find-id"
                value={email}
                placeholder="가입하신 이메일을 입력해주세요."
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <p>
                이메일 발송에는 시간이 걸릴 수 있습니다. <br />
                3분이 넘도록 메일이 도착하지 않으면
                <br /> 재시도 해주시기 바랍니다.
              </p>
              <button className="user-btn" onClick={handleFindEmailId}>
                이메일 전송
              </button>
            </div>
          )}
          {movePage === "B" && (
            <div className="find-pass-modal">
              <label>
                이메일로 보내드린 <br />
                인증번호를 입력해주세요.
              </label>
              <input
                type="text"
                value={enteredNum}
                placeholder="인증번호를 입력해주세요."
                onChange={(e) => setEnteredNum(e.target.value)}
              />
              <br />
              <button className="user-btn" onClick={handleCheckNum}>
                확인
              </button>
            </div>
          )}
          {movePage === "C" && (
            <div className="find-pass-modal">
              <label htmlFor="find-pw">새 비밀번호를 입력해주세요!</label>
              <br />
              <input
                type="password"
                name="find-pw"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <input
                type="password"
                name="check-pw"
                value={checkPassword}
                onChange={(e) => setCheckPassword(e.target.value)}
              />
              <br />
              {password !== checkPassword && (
                <small>입력하신 비밀번호가 일치하지 않습니다.</small>
              )}
              <br />
              <button className="user-btn" onClick={handleEditPW}>
                비밀번호 변경
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FindIdPass;
