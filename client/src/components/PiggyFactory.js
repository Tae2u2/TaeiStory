import React, { useRef, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { Base64 } from "js-base64";

const PiggyFactory = ({ userid, reload, setReload }) => {
  const foodinputRef = useRef();
  const foodExpenseinputRef = useRef();
  const krwinputRef = useRef();
  const [food, setfood] = useState("");
  const [foodExpense, setFoodExpense] = useState(0);
  const [countryList, setCountryList] = useState([]);
  const [country, setCountry] = useState("");
  const [krw, setKrw] = useState(0);
  const [chooseDate, setChooseDate] = useState("latest");
  const [codeName, setCodeName] = useState("KRW");
  const [exchangedMoney, setExchangedMoney] = useState(0);
  const [attachment, setAttachment] = useState("");
  const fileInput = useRef(null);
  let today;

  const getCountryList = async () => {
    const response = await axios.post("/api/currency");
    let wildList = [...response.data.trList];
    setCountryList(wildList.slice(1));
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
    today = date.yyyymmdd();
    setChooseDate(date.yyyymmdd());
  };

  const getKrwCurrency = async () => {
    if (chooseDate !== undefined && codeName !== "") {
      try {
        const response = await axios.get(
          `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/${chooseDate}/currencies/${codeName.toLowerCase()}.json`
        );
        if (response.status !== 200) {
          alert("죄송합니다. 다시 시도해주세요");
        } else {
          let list = Object.values(response.data);
          let currencyObj = { ...list[1] };
          setKrw(currencyObj["krw"]);
        }
      } catch (error) {
        alert("죄송합니다. 다시 시도해주세요!");
      }
    }
  };

  const onSelect = (e) => {
    const {
      target: { value },
    } = e;
    let myvalue = value;
    setCodeName(myvalue.split(",")[0]);
    setCountry(myvalue.split(",")[1]);
    if (e.target.value === "") {
      alert("공식화폐가 등록되지 않은 나라는 미국 달러로 표시됩니다.");
      setCodeName("USD");
      setCountry(myvalue.split(",")[1]);
    }
  };
  const handleDate = (event) => {
    const {
      target: { value },
    } = event;
    setChooseDate(value);
  };

  const handleMoney = () => {
    setExchangedMoney(krwinputRef.current.value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    if (Boolean(theFile)) {
      reader.readAsDataURL(theFile);
    }
  };

  const handleClearAttachment = () => {
    fileInput.current.value = null;
    setAttachment("");
  };
  const removeAmount = () => {
    setFoodExpense("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(exchangedMoney);
    const byteCharacters = window.atob(exchangedMoney.toString());
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "image/gif" });
    var imageUrl = URL.createObjectURL(blob);
    console.log(imageUrl);
    const piggyObj = {
      id: uuidv4(),
      useremail: userid,
      food: food,
      country: country,
      foodExpense: foodExpense,
      exchangedMoney: exchangedMoney,
      currencyCode: codeName,
      tripDate: chooseDate,
      imageURL: imageUrl,
    };
    console.log(piggyObj);
    const piggydata = JSON.stringify(piggyObj);
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
        setFoodExpense("");
        setfood("");
        handleClearAttachment();

        if (reload) {
          setReload(false);
        } else {
          setReload(true);
        }
      } else {
        alert("죄송합니다. 다시 시도해주세요!", "center");
        return false;
      }
    } catch (error) {
      alert("죄송합니다. 다시 시도해주세요!", "center");
      return false;
    }
  };

  useEffect(() => {
    getCountryList();
    getToday();
  }, []);

  useEffect(() => {
    getKrwCurrency();
  }, [codeName, chooseDate]);
  useEffect(() => {
    handleMoney();
  }, [foodExpense]);

  return (
    <form method="post" className="piggy-form" onSubmit={handleSubmit}>
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
      <br />
      <label htmlFor="choose-country">여행 중인 나라를 선택해주세요!</label>
      <select id="country-select" onChange={onSelect}>
        <option value="USD">--나라를 선택해주세요--</option>
        {countryList.map((item, index) => (
          <option key={index} value={[item.currencyName, item.country]}>
            화폐 : {item.currencyName}, 나라이름 : {item.country}
          </option>
        ))}
      </select>
      <br />
      <label htmlFor="food">무엇을</label>
      <input
        type="text"
        id="food"
        name="food"
        className="piggy-input"
        required
        ref={foodinputRef}
        value={food}
        requiredtitle="음식을 입력해주세요!"
        onChange={() => setfood(foodinputRef.current.value)}
      />
      <br />
      <input
        type="file"
        ref={fileInput}
        accept="image/*"
        onChange={onFileChange}
      />
      <br />
      {attachment && (
        <div>
          <img src={attachment} alt="preview" width="70px" height="70px" />
          <button onClick={handleClearAttachment}>Clear</button>
        </div>
      )}

      <br />
      <label htmlFor="foodExpense">
        음식을 먹고 낸 금액을 입력하세요 <br />
        예시: 500엔이면 500
      </label>
      <input
        type="number"
        id="foodExpense"
        name="foodExpense"
        ref={foodExpenseinputRef}
        className="piggy-input"
        onChange={() => setFoodExpense(foodExpenseinputRef.current.value)}
        value={foodExpense}
      />
      <br />
      <label htmlFor="exchangedMoney">한국 돈으로</label>
      <input
        type="number"
        id="exchangedMoney"
        name="exchangedMoney"
        ref={krwinputRef}
        className="piggy-input"
        value={Math.round(krw * foodExpense)}
        readOnly
      />
      <p>원 입니다.</p>
      <br />
      <button onClick={removeAmount}>입력한 금액 0으로 돌리기!</button>
      <br />
      <input className="piggy-btn" type="submit" value="입력" />
    </form>
  );
};

export default PiggyFactory;
