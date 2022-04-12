import axios from "axios";
import React, { useEffect, useState } from "react";

const PiggysList = ({
  username,
  userid,
  myfood,
  mymoney,
  id,
  setWatch,
  watch,
}) => {
  const handleDelete = async (event) => {
    const pTarget = event.target.getAttribute("id");
    const sayYes = window.confirm(
      "왜 삭제하시는 거죠? 스스로를 속이시는 건가요?"
    );
    if (sayYes) {
      const response = await axios.post("/api/piggyboss?type=delete", {
        is_id: pTarget,
      });
      if (watch) {
        setWatch(false);
      } else {
        setWatch(true);
      }
    }
  };

  return (
    <div className="list-box">
      <h3 className="list-h3">
        {myfood}를 {mymoney}원에 드셨습니다.
      </h3>
      <button className="delete-btn" id={id} onClick={handleDelete}>
        ❌
      </button>
    </div>
  );
};

export default PiggysList;
