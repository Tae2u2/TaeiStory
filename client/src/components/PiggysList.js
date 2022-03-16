import axios from "axios";
import React, { useEffect, useState } from "react";
import cookie from "react-cookies";

const PiggysList = ({ userInfo }) => {
  const [piggys, setPiggys] = useState(null);
  const [piggyArr, setPiggyArr] = useState([]);

  useEffect(async () => {
    try {
      const response = await axios.post("/api/LoginForm?type=SessionConfirm", {
        token1: cookie.load("userid"),
        token2: cookie.load("username"),
      });
      const useremail = response.data.token1;
      console.log(useremail);

      const response2 = await axios.post("api/piggyboss?type=piggylist", {
        is_Email: useremail,
      });

      let myArr = [];
      for (let i = 0; i < response2.data.json.length; i++) {
        let id = response2.data.json[i].id;
        let useremail = response2.data.json[i].useremail;
        let food = response2.data.json[i].food;
        let foodExpenses = response2.data.json[i].foodExpenses;
        myArr[i] = {
          id: id,
          userEmail: useremail,
          Food: food,
          FoodExpenses: foodExpenses,
        };
      }
      setPiggyArr([...myArr]);
    } catch (error) {
      alert("다시 시도해주세요!");
    }
  }, []);

  console.log(JSON.stringify(piggyArr));
  console.log(piggyArr.map((arr) => console.log(arr)));

  return (
    <div>
      <h3>List</h3>
      <div>
        <ul>
          <li>내 배열이 왜 계속 사라지는 가</li>
        </ul>
      </div>
    </div>
  );
};

export default PiggysList;
