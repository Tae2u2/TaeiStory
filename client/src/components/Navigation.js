import { useState } from "react";
import cookie from "react-cookies";

function Navigation({ username }) {
  const [check, setCheck] = useState(false);

  const handleLogout = async () => {
    cookie.remove("userid", { path: "/" });
    cookie.remove("username", { path: "/" });
    cookie.remove("userpassword", { path: "/" });
    window.location.href = "/";
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
        <li className="navi-li">꿀꿀</li>
        <li className="navi-li" onClick={handleIdBox}>
          {username}님, 환영합니다!
          <ul className={check ? "second-ul active" : "second-ul"}>
            <li className="id-box">내 정보</li>
            <li className="id-box">
              <button onClick={handleLogout}>로그아웃</button>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
