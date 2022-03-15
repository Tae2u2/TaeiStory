import axios from "axios";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const PiggysList = ({ userid, username, food, foodExpenses, piggyChanged }) => {
  const [piggys, setPiggys] = useState(null);
  let piggyArr = [];

  useEffect(() => {
    try {
      axios
        .post("api/piggyboss?type=piggylist", {
          is_Email: userid,
        })
        .then((response) => {
          console.log(response);
          console.log(response.data.json.length);
          for (let i = 0; i < response.data.json.length; i++) {
            piggyArr.push({
              useremail: response.data.json[i].useremail,
              food: response.data.json[i].food,
              foodExpenses: response.data.json[i].foodExpenses,
            });
          }
          console.log(piggyArr);
        });
    } catch (error) {
      alert("다시 시도해주세요!");
    }
  }, []);

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
