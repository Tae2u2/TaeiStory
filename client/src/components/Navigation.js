import { useState } from "react";
import cookie from "react-cookies";
import axios from "axios";
import { Link } from "react-router-dom";

function Navigation({ username, userid }) {
  const [check, setCheck] = useState(false);

  const handleLogout = async () => {
    const sayYes = window.confirm("로그아웃 하시겠습니까?");
    if (sayYes) {
      cookie.remove("userid", { path: "/" });
      cookie.remove("username", { path: "/" });
      cookie.remove("userpassword", { path: "/" });
      window.location.href = "/";
    } else {
      return false;
    }
  };

  const handleUserDelete = async () => {
    const sayYes = window.confirm(
      "회원을 탈퇴하시면 모든 정보가 사라집니다. 정말로 탈퇴하시겠습니까?"
    );
    if (sayYes) {
      const confirm2 = window.prompt(
        '아래 입력창에 "돼지짱 정보를 삭제하겠습니다" 라고 적어주세요!'
      );
      if (confirm2 === "돼지짱 정보를 삭제하겠습니다") {
        const response2 = await axios.post("/api/piggyboss?type=deleteall", {
          is_Email: userid,
        });
        if (response2.data === "succ") {
          console.log("삭제됨");
        } else {
          console.log("콩쥐야좃대써");
        }
        const response = await axios.post("/api/LoginForm?type=deleteUser", {
          is_id: userid,
        });
        if (response.data === "succ") {
          alert("그동안 감사했습니다. 안녕히가세요!");

          cookie.remove("userid", { path: "/" });
          cookie.remove("username", { path: "/" });
          cookie.remove("userpassword", { path: "/" });
          window.location.href = "/";
        } else {
          alert("죄송합니다 다시 시도해주세요");
        }
      } else {
        alert("문구를 잘못입력하셨습니다. 다시 시도해주세요.");
      }
    } else {
      return false;
    }
  };

  const handleIdBox = () => {
    if (check) {
      setCheck(false);
    } else {
      setCheck(true);
    }
  };

  return (
    <nav>
      <ul className="first-ul">
        <li className="navi-li">
          <Link to="/piggy">당신은 돼지짱입니까?</Link>
        </li>
        {userid === "admin@admin" && (
          <li className="navi-li">
            <Link to="/adminpage">관리자페이지</Link>
          </li>
        )}
        <li className="navi-li" onClick={handleIdBox}>
          {username}님, 환영합니다!
          <ul className={check ? "second-ul active" : "second-ul"}>
            <li className="id-box">
              <button className="id-box-btn" onClick={handleLogout}>
                로그아웃
              </button>
            </li>
            <li className="id-box">
              {userid !== "admin@admin" && (
                <button className="id-box-btn" onClick={handleUserDelete}>
                  회원탈퇴
                </button>
              )}
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
