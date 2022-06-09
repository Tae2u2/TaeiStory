import AppRouter from "./Router";
import "../css/style.scss";
import Auth from "Routes/Auth";
import { useEffect, useState } from "react";
import cookie from "react-cookies";

function App() {
  const [userInfo, setUserInfo] = useState(null);
  const [init, setInit] = useState(false);

  useEffect(() => {
    async function axiosData() {
      const response = await axios.post("/api/LoginForm?type=SessionConfirm", {
        token1: cookie.load("userid"),
        token2: cookie.load("username"),
        token3: cookie.load("userflag"),
      });
      setUserInfo({
        userId: response.data.token1,
        userName: response.data.token2,
        userFlag: response.data.token3,
      });
    }
    axiosData().then(setInit(true));
  }, []);
  return (
    <div className="App">
      {init ? (
        <AppRouter isLoggedIn={Boolean(userObj)} userInfo={userInfo} />
      ) : (
        <span id="loading-bar"></span>
      )}
    </div>
  );
}

export default App;
