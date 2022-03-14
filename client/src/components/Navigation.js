import cookie from "react-cookies";

function Navigation({ userInfo }) {
  const handleLogout = async () => {
    cookie.remove("userid", { path: "/" });
    cookie.remove("username", { path: "/" });
    cookie.remove("userpassword", { path: "/" });
    window.location.href = "/login";
  };
  return (
    <nav>
      <ul>
        <li>
          {userInfo.userName}님, 환영합니다!
          <ul>
            <li>내 정보</li>
            <li>
              <button onClick={handleLogout}>로그아웃</button>
            </li>
          </ul>
        </li>
        <li>꿀꿀</li>
      </ul>
    </nav>
  );
}

export default Navigation;
