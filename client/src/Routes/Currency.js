import axios from "axios";
import React, { useEffect, useState } from "react";

const Currency = () => {
  const [countryList, setCountryList] = useState([]);
  const [krw, setKrw] = useState(1);
  const [chooseDate, setChooseDate] = useState("latest");
  const [enteredAmount, setEnteredAmount] = useState(0);
  const [code, setCode] = useState("krw");
  const [travelingCountry, setTravelingCountry] = useState(null);
  const [today, setToday] = useState("");

  const getCountryList = async () => {
    const response = await axios.post("/api/currency");
    setCountryList(response.data.trList);
  };

  const getToday = () => {
    Date.prototype.yyyymmdd = function () {
      const yyyy = this.getFullYear();
      const mm =
        this.getMonth() < 9 ? `0${this.getMonth() + 1}` : this.getMonth() + 1;
      const dd =
        this.getDate() < 10 ? `0${this.getDate() - 1}` : this.getDate() - 1;

      return `${yyyy}-${mm}-${dd}`;
    };

    const date = new Date();
    setToday(date.yyyymmdd());
    setChooseDate(date.yyyymmdd());
  };

  const getKrwCurrency = async () => {
    if (chooseDate !== undefined) {
      const url = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/${chooseDate}/currencies/${code}.json`;
      const response = await axios.get(url);
      if (response.status !== 200) {
        alert("죄송합니다. 다시 시도해주세요");
      } else {
        console.log(response.data);
        let list = Object.values(response.data);
        setTravelingCountry(list[1]);
        console.log(travelingCountry["krw"]);
        setKrw(travelingCountry["krw"]);
      }
    }
    //response.data->{currencycode : 환율} response.data.date ->2022-06-14 타입
  };

  const onSelect = async (e) => {
    let keyword = e.target.value;
    if (keyword !== "") {
      setCode(keyword.toLowerCase()); //USD같은 currencycode
    } else {
      setCode("usd");
    }
  };
  const handleDate = (e) => setChooseDate(e.target.value);

  const removeAmount = () => {
    setEnteredAmount(0);
  };

  useEffect(() => {
    getCountryList();
    getToday();
  }, []);

  useEffect(() => {
    getKrwCurrency();
  }, [code, chooseDate]);

  return (
    <div className="travel-pig">
      <h4>돼지는 여행중</h4>
      <label htmlFor="trip-day">
        기록하고 싶은 여행날짜를 선택하세요! <br />
        선택하지 않으시면 오늘 날짜로 기록됩니다.
      </label>
      <input
        type="date"
        id="trip-date"
        name="trip-day"
        value={chooseDate}
        min="2018-01-01"
        max={today}
        onChange={handleDate}
      />
      <label htmlFor="choose-country">여행 중인 나라를 선택해주세요!</label>
      <select name="choose-country" id="country-select" onChange={onSelect}>
        <option value="">--나라를 선택해주세요--</option>
        {countryList.map((item, index) => (
          <option key={index} value={item.currencyName}>
            {item.country}
          </option>
        ))}
      </select>
      <div></div>
      <label htmlFor="entered-amount">
        음식을 먹고 낸 금액을 입력하세요 <br />
        예시: 500엔이면 500
      </label>
      <input
        type="text"
        name="entered-amount"
        onChange={(e) => setEnteredAmount(e.target.value)}
        value={enteredAmount}
      />
      <label htmlFor="entered-amount">한국 돈으로</label>
      <input type="text" value={krw * enteredAmount} readOnly />
      <p>원 입니다.</p>
      <button onClick={removeAmount}>입력한 금액 0으로 돌리기!</button>
    </div>
  );
};

export default Currency;
