import React, { useEffect, useState } from "react";
import Navigation from "./Navigation";
import { v4 as uuidv4 } from "uuid";
import PiggysList from "./PiggysList";
import cookie from "react-cookies";

function PiggyBoss({ userInfo }) {
  const [foodExpenses, setFoodExpenses] = useState("");
  const [food, setFood] = useState("");
  const [piggyChanged, setPiggyChanged] = useState(false);

  console.log(userInfo);
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
      useremail: userInfo.userEmail,
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
        setPiggyChanged(true);
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
  return (
    <div>
      <Navigation userInfo={userInfo} />
      <h3>PiggyBoss</h3>
      <p>{userInfo.userName}님은 돼지짱입니다.</p>
      <form method="post" onSubmit={onSubmit}>
        <p>돼지짱님 오늘은</p>
        <br />
        <label id="food">무엇을</label>
        <input type="text" id="food" name="food" onChange={onChange} />
        <br />
        <label id="foodExpense">얼마치</label>
        <input
          type="text"
          id="foodExpense"
          name="foodExpense"
          onChange={onChange}
        />
        <p>드셨사옵니까?</p>
        <input type="submit" value="입력" />
      </form>
      <div>
        <PiggysList
          userInfo={userInfo}
          food={food}
          foodExpenses={foodExpenses}
          piggyChanged={piggyChanged}
        />
      </div>
    </div>
  );
}

export default PiggyBoss;
