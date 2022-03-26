import React, { useEffect, useState } from "react";

const PiggysList = ({ username, userid, piggyArr }) => {
  console.log(piggyArr);

  return (
    <div>
      <h3>List</h3>
      <div>
        <ul>
          <li>
            내 배열이 왜 계속 사라지는 가{username} : {userid}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PiggysList;
