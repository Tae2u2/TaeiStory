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
      handleOpenModal();
    }
  };

  const handleCheckNum = () => {
    if (enteredNum == number) {
      setMovePage("C");
    } else {
      alert("입력하신 번호가 틀립니다!");
      setMovePage("A");
      setEnteredNum("");
    }
  };

  const handleEditPW = async () => {
    if (password === checkPassword) {
      const response = await axios.post("/api/register?type=pwdmodify", {
        is_Password: password,
        is_Useremail: email,
      });
      console.log(response.data);
      if (response.data === "succ") {
        alert("비밀번호가 변경되었습니다.");
        setPassword("");
        setCheckPassword("");
        handleOpenModal();
      }
    } else {
      alert("입력하신 비밀번호가 일치하지 않습니다.");
    }
  };

  const handleOpenModal = () => {
    if (openModal) {
      setOpenModal(false);
    } else {
      setOpenModal(true);
    }
  };
  return (
    <div>
      <button onClick={handleOpenModal}>비밀번호 찾기</button>
      {openModal && (
        <div>
          <span onClick={handleOpenModal}>X</span>
          {movePage === "A" && (
            <div>
              <label htmlFor="find-id">이메일 인증을 진행해주세요!</label>
              <input
                type="text"
                name="find-id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button onClick={handleFindEmailId}>이메일 전송</button>
            </div>
          )}
          {movePage === "B" && (
            <div>
              <input
                type="text"
                value={enteredNum}
                onChange={(e) => setEnteredNum(e.target.value)}
              />
              <button onClick={handleCheckNum}>확인</button>
            </div>
          )}
          {movePage === "C" && (
            <div>
              <label htmlFor="find-pw">새 비밀번호를 입력해주세요!</label>
              <input
                type="password"
                name="find-pw"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                name="check-pw"
                value={checkPassword}
                onChange={(e) => setCheckPassword(e.target.value)}
              />
              {password === checkPassword ? (
                <small>확인되었습니다.</small>
              ) : (
                <small>입력하신 비밀번호가 일치하지 않습니다.</small>
              )}
              <button onClick={handleEditPW}>비밀번호 변경</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FindIdPass;
