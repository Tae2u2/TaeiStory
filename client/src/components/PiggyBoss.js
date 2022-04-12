import React, { useEffect, useRef, useState } from "react";
import Navigation from "./Navigation";
import { v4 as uuidv4 } from "uuid";
import PiggysList from "./PiggysList";
import cookie from "react-cookies";
import axios from "axios";
import ReactPaginate from "react-paginate";
import "../css/style.css";
import Piggys from "./Piggys";

function PiggyBoss({ userInfo }) {
  const inputRef = useRef();
  const [foodExpenses, setFoodExpenses] = useState("");
  const [food, setFood] = useState("");
  const [piggyMoney, setPiggyMoney] = useState(0);
  const [watch, setWatch] = useState(false);

  const [userid, setUserid] = useState("");
  const [username, setUsername] = useState("");
  const [piggyArr, setPiggyArr] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const userPerPage = 5;
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
          setWatch={setWatch}
          watch={watch}
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
        if (watch) {
          setWatch(false);
        } else {
          setWatch(true);
        }
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

    const response3 = await axios.post("api/piggyboss?type=piggyexpenses", {
      is_Email: response.data.token1,
    });

    const cost = Object.values(response3.data.json[0]);
    setPiggyMoney(cost.pop());

    inputRef.current.focus();
  }, [watch]);

  return (
    <div className="im-home">
      <Navigation username={username} userid={userid} />
      <div className="for-flex">
        <div className="im-piggyzone">
          <h3 className="piggy-h3">{username}님 오늘은</h3>
          <form method="post" className="piggy-form" onSubmit={onSubmit}>
            <label id="food">무엇을</label>
            <input
              ref={inputRef}
              className="piggy-input"
              placeholder="ex)떡볶이"
              type="text"
              id="food"
              value={food}
              name="food"
              onChange={onChange}
            />
            <br />
            <label id="foodExpense">얼마치</label>
            <input
              className="piggy-input"
              type="text"
              placeholder="ex)14000"
              id="foodExpense"
              name="foodExpense"
              value={foodExpenses}
              onChange={onChange}
            />
            <h3 className="piggy-h3">드셨사옵니까?</h3>
            <input className="piggy-btn" type="submit" value="입력" />
          </form>
          <div>
            {displayPiggy}
            <ReactPaginate
              previousLabel={"◀"}
              nextLabel={"▶"}
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
        <Piggys piggyMoney={piggyMoney} />
      </div>
    </div>
  );
}

export default PiggyBoss;
