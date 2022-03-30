import axios from "axios";
import React, { useEffect, useState } from "react";

const PiggysList = ({ username, userid, myfood, mymoney, id }) => {
  const handleDelete = async (event) => {
    const pTarget = event.target.getAttribute("id");
    const sayYes = window.confirm(
      "왜 삭제하시는 거죠? 스스로를 속이시는 건가요?"
    );
    if (sayYes) {
      const response = await axios.post("/api/piggyboss?type=delete", {
        is_id: pTarget,
      });
    }
  };

  return (
    <div>
      <h3>
        {myfood}를 {mymoney}원에 드셨습니다.
      </h3>
      <button id={id} onClick={handleDelete}>
        삭제
      </button>
    </div>
  );
};

export default PiggysList;
