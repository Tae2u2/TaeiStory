import React, { useEffect, useState } from "react";
import cookie from "react-cookies";
import axios from "axios";
import ReactPaginate from "react-paginate";

import Navigation from "../components/Navigation";
import PiggysList from "../components/PiggysList";
import PiggyFactory from "../components/PiggyFactory";

import "../css/piggy.scss";

function PiggyBoss() {
  const [piggyMoney, setPiggyMoney] = useState(0);
  const [reload, setReload] = useState(false);
  const [open, setOpen] = useState(false);

  const [userInfo, setUserInfo] = useState({});
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
          regdate={item.reg_date}
          myfood={item.food}
          mymoney={item.foodExpenses}
          tripCountry={item.country}
          tripDate={item.tripDate}
          commentary={item.commentary}
          krwMoney={item.exchangedMoney}
          attachment={item.imageURL}
          code={item.currencyCode}
          setReload={setReload}
          reload={reload}
        />
      );
    });

  const pageCount = Math.ceil(piggyArr.length / userPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const openFactory = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
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
          <h2>총 합계 금액 : {piggyMoney}원</h2>
          {open ? (
            <div>
              <PiggyFactory
                userid={userInfo.userId}
                reload={reload}
                setReload={setReload}
                setOpen={setOpen}
                open={open}
              />
              <h3 className="piggy-h3" onClick={() => setOpen(!open)}>
                입력화면 닫기
              </h3>
            </div>
          ) : (
            <h3 className="piggy-h3" onClick={() => setOpen(!open)}>
              입력창 열기
            </h3>
          )}
        </div>
        <div className="piggy-List">
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
    </div>
  );
}

export default PiggyBoss;
