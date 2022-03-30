import React, { useEffect, useState } from "react";
import Navigation from "./Navigation";
import { v4 as uuidv4 } from "uuid";
import PiggysList from "./PiggysList";
import cookie from "react-cookies";
import axios from "axios";
import ReactPaginate from "react-paginate";

function PiggyBoss({ userInfo }) {
  const [foodExpenses, setFoodExpenses] = useState("");
  const [food, setFood] = useState("");

  const [userid, setUserid] = useState("");
  const [username, setUsername] = useState("");
  const [piggyArr, setPiggyArr] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const userPerPage = 10;
  const pagesVisited = pageNumber * userPerPage;

  const displayPiggy = piggyArr
    .slice(pagesVisited, pagesVisited + userPerPage)
    .map((item) => {
      return (
        <PiggysList
          key={item.id}
          id={item.id}
          myfood={item.food}
          mymoney={item.foodExpenses}
          username={username}
          userid={userid}
        />
      );
    });

  const pageCount = Math.ceil(piggyArr.length / userPerPage);

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
  const changePage = ({ selected }) => {
    setPageNumber(selected);
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
      if (checkSuc === "succ") {
        setFoodExpenses("");
        setFood("");
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
    const response2 = await axios.post("api/piggyboss?type=piggylist", {
      is_Email: response.data.token1,
    });

    setPiggyArr(response2.data.json);
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
        {displayPiggy}
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"disabledBttn"}
          activeClassName={"activeBttn"}
        />
      </div>
    </div>
  );
}

export default PiggyBoss;
