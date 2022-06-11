import React, { useEffect, useState } from "react";
import cookie from "react-cookies";
import axios from "axios";
import ReactPaginate from "react-paginate";

import Navigation from "../components/Navigation";
import PiggysList from "../components/PiggysList";
import Piggys from "../components/Piggys";
import PiggyFactory from "../components/PiggyFactory";

import "../css/piggy.scss";

function PiggyBoss() {
  const [piggyMoney, setPiggyMoney] = useState(0);
  const [reload, setReload] = useState(false);

  const [userInfo, setUserInfo] = useState({});
  const [piggyArr, setPiggyArr] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const userPerPage = 3;
  const pagesVisited = pageNumber * userPerPage;

  const displayPiggy = piggyArr
    .slice(pagesVisited, pagesVisited + userPerPage)
    .map((item) => {
      return (
        <PiggysList
          key={item.id}
          id={item.id}
          regdate={item.reg_date}
          myfood={item.food}
          mymoney={item.foodExpenses}
          setReload={setReload}
          reload={reload}
        />
      );
    });

  const pageCount = Math.ceil(piggyArr.length / userPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  useEffect(() => {
    async function axiosData() {
      const response = await axios.post("/api/LoginForm?type=SessionConfirm", {
        token1: cookie.load("userid"),
        token2: cookie.load("username"),
        token3: cookie.load("userflag"),
      });
      let id = response.data.token1;
      let name = response.data.token2;
      let flag = response.data.token3;

      let userObj = {
        userId: id,
        userName: name,
        userFlag: flag,
      };
      setUserInfo(userObj);

      const response2 = await axios.post("api/piggyboss?type=piggylist", {
        is_Email: id,
      });

      setPiggyArr(response2.data.json);

      const response3 = await axios.post("api/piggyboss?type=piggyexpenses", {
        is_Email: id,
      });

      const cost = Object.values(response3.data.json[0]);
      setPiggyMoney(cost.pop());
    }
    axiosData();
  }, [reload]);

  return (
    <div className="im-home">
      <Navigation userInfo={userInfo} />
      <div className="for-flex">
        <div className="im-piggyzone">
          <h3 className="piggy-h3">{userInfo.userName}님 오늘은</h3>
          <PiggyFactory
            userid={userInfo.userId}
            reload={reload}
            setReload={setReload}
          />
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
