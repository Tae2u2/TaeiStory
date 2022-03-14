import { useEffect } from "react";
import AppRouter from "./Router";
import cookie from "react-cookies";
import axios from "axios";

function App() {
  useEffect(() => {
    axios
      .post("/api/LoginForm?type=SessionConfirm", {
        token1: cookie.load("userid"),
        token2: cookie.load("username"),
      })
      .then((response) => {
        const userid = response.data.token1;
        let password = cookie.load("userpassword");
        if (password !== undefined) {
          axios
            .post("/api/LoginForm?type=SessionSignin", {
              is_Email: userid,
              is_Token: password,
            })
            .then((response) => {
              if (response.data.json[0].useremail === undefined) {
                noPermission();
              }
            })
            .catch((error) => {
              noPermission();
            });
        }
      });
  }, []);

  const noPermission = (e) => {
    if (window.location.hash != "nocookie") {
      remove_cookie();
      window.location.href = "/";
    }
  };

  const remove_cookie = (e) => {
    cookie.remove("userid", { path: "/" });
    cookie.remove("username", { path: "/" });
    cookie.remove("userpassword", { path: "/" });
  };

  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;
