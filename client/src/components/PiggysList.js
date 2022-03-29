import React, { useEffect, useState } from "react";

const PiggysList = ({ username, userid, myfood, mymoney }) => {
  return (
    <div>
      <h3>
        {myfood}를 {mymoney}원에 드셨습니다.
      </h3>
      <button>삭제</button>
    </div>
  );
};

export default PiggysList;
