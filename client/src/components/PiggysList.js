import axios from "axios";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const PiggysList = ({ userInfo, food, foodExpenses, piggyChanged }) => {
  const [piggyArr, setPiggyArr] = useState([]);
  const [piggys, setPiggys] = useState(null);
  console.log(userInfo);

  function makeList(piggys) {
    setPiggyArr([...piggys]);
  }
  useEffect(() => {
    try {
      axios
        .post("api/piggyboss?type=piggylist", {
          is_Email: userInfo.userEmail,
        })
        .then((response) => {
          console.log(response);
          setPiggys({
            useremail: response.data.json[0].useremail,
            food: response.data.json[0].food,
            foodExpenses: response.data.json[0].foodExpenses,
          });
          makeList(piggys);
        });
    } catch (error) {
      alert("다시 시도해주세요!");
    }
  }, []);
  console.log(piggys);

  return (
    <div>
      <h3>List</h3>
      <div>
        <ul>
          <li>또이러네</li>
        </ul>
      </div>
    </div>
  );
};

export default PiggysList;
