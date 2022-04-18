import React, { useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";

const PiggyFactory = ({ userid, reload, setReload }) => {
  const inputRef = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const piggyObj = {
      id: uuidv4(),
      useremail: userid,
      ...data,
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
        if (reload) {
          setReload(false);
        } else {
          setReload(true);
        }
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
    <form
      method="post"
      className="piggy-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label id="food">무엇을</label>
      <input
        type="text"
        id="food"
        name="food"
        className="piggy-input"
        placeholder="ex)떡볶이"
        ref={inputRef}
        {...register("food", { required: true })}
      />
      <br />
      {errors.food && <small>음식을 입력해주세요</small>}
      <br />
      <label id="foodExpense">얼마치</label>
      <input
        type="text"
        id="foodExpense"
        name="foodExpense"
        className="piggy-input"
        placeholder="ex)14000"
        {...register("foodExpense", { required: true, pattern: /^\d$/ })}
      />
      <br />
      {errors.foodExpense && <small>금액을 숫자로 입력해주세요</small>}
      <br />
      <h3 className="piggy-h3">드셨사옵니까?</h3>
      <input className="piggy-btn" type="submit" value="입력" />
    </form>
  );
};

export default PiggyFactory;
