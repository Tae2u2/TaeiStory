import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";

const PiggyFactory = ({ userid, reload, setReload }) => {
  const foodinputRef = useRef();
  const foodExpenseinputRef = useRef();
  const [food, setfood] = useState("");
  const [foodExpense, setFoodExpense] = useState("");

  const saveAlert = (flag, positionflag) => {
    Swal.fire({
      position: positionflag,
      icon: "success",
      title: flag,
      showConfirmButton: false,
      timer: 1000,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const piggyObj = {
      id: uuidv4(),
      useremail: userid,
      food: food,
      foodExpense: foodExpense,
    };
    const piggydata = JSON.stringify(piggyObj);
    try {
      const response = await fetch("api/piggyboss?type=inputpiggy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: piggydata,
      });
      const checkSuc = await response.text();
      if (checkSuc === "succ") {
        saveAlert("입력 성공!", "center");
        setFoodExpense("");
        setfood("");
        if (reload) {
          setReload(false);
        } else {
          setReload(true);
        }
      } else {
        saveAlert("죄송합니다. 다시 시도해주세요!", "center");
        return false;
      }
    } catch (error) {
      saveAlert("죄송합니다. 다시 시도해주세요!", "center");
      return false;
    }
  };

  return (
    <form method="post" className="piggy-form" onSubmit={handleSubmit}>
      <label id="food">무엇을</label>
      <input
        type="text"
        id="food"
        name="food"
        className="piggy-input"
        placeholder="ex)떡볶이"
        required
        ref={foodinputRef}
        value={food}
        requiredtitle="음식을 입력해주세요!"
        onChange={() => setfood(foodinputRef.current.value)}
      />
      <br />
      <label id="foodExpense">얼마치</label>
      <input
        type="text"
        id="foodExpense"
        name="foodExpense"
        className="piggy-input"
        value={foodExpense}
        placeholder="ex)14000"
        ref={foodExpenseinputRef}
        pattern="[0-9]+"
        required
        requiredtitle="숫자로 입력해주세요!"
        onChange={() => setFoodExpense(foodExpenseinputRef.current.value)}
      />
      <br />
      <h3 className="piggy-h3">드셨사옵니까?</h3>
      <input className="piggy-btn" type="submit" value="입력" />
    </form>
  );
};

export default PiggyFactory;
