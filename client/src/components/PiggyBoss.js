import React, { useEffect, useState } from "react";
import Navigation from "./Navigation";
import { v4 as uuidv4 } from "uuid";
import PiggysList from "./PiggysList";
import cookie from "react-cookies";
import axios from "axios";

function PiggyBoss({ userInfo }) {
  const [foodExpenses, setFoodExpenses] = useState("");
  const [food, setFood] = useState("");

  const [userid, setUserid] = useState("");
  const [username, setUsername] = useState("");
  const [piggyArr, setPiggyArr] = useState([]);

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "foodExpense") {
      setFoodExpenses(value);
    } else if (name === "food") {
      setFood(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const piggyObj = {
      id: uuidv4(),
      useremail: userid,
      food: food,
      foodExpenses: foodExpenses,
    };
    const piggydata = JSON.stringify(piggyObj);
    console.log(piggydata);
    try {
      const response = await fetch("api/piggyboss?type=inputpiggy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: piggydata,
      });
      const checkSuc = await response.text();
      console.log(checkSuc);
      if (checkSuc === "succ") {
        setFoodExpenses("");
        setFood("");

        const response = await axios.post("api/piggyboss?type=piggylist", {
          is_Email: userid,
        });

        console.log("리스트 결과임 ->");
        console.log(response);
        console.log(response.data.json);
        const myArr = response.data.json;
        setPiggyArr(myArr);
        console.log(myArr);

        alert("오늘도 대단하십니다.");
      } else {
        alert("죄송합니다.");
        return false;
      }
    } catch (error) {
      alert("죄송합니다 다시 시도해주세요!");
      return false;
    }
  };

  useEffect(async () => {
    const response = await axios.post("/api/LoginForm?type=SessionConfirm", {
      token1: cookie.load("userid"),
      token2: cookie.load("username"),
    });
    setUserid(response.data.token1);
    setUsername(response.data.token2);
  }, []);
  return (
    <div>
      <Navigation username={username} />
      <h3>PiggyBoss</h3>
      <p>{username}님은 돼지짱입니다.</p>
      <form method="post" onSubmit={onSubmit}>
        <p>돼지짱님 오늘은</p>
        <br />
        <label id="food">무엇을</label>
        <input
          type="text"
          id="food"
          value={food}
          name="food"
          onChange={onChange}
        />
        <br />
        <label id="foodExpense">얼마치</label>
        <input
          type="text"
          id="foodExpense"
          name="foodExpense"
          value={foodExpenses}
          onChange={onChange}
        />
        <p>드셨사옵니까?</p>
        <input type="submit" value="입력" />
      </form>
      <div>
        <PiggysList piggyArr={piggyArr} username={username} userid={userid} />
      </div>
    </div>
  );
}

export default PiggyBoss;
