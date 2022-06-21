import React, { useRef, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const PiggyFactory = ({ userid, reload, setReload, setOpen, open }) => {
  const foodinputRef = useRef();
  const foodExpenseinputRef = useRef();
  const krwinputRef = useRef();
  const fileInput = useRef(null);
  const commentaryRef = useRef();

  const [food, setfood] = useState("");
  const [foodExpense, setFoodExpense] = useState(0);
  const [countryList, setCountryList] = useState([]);
  const [country, setCountry] = useState("");
  const [krw, setKrw] = useState(0);
  const [chooseDate, setChooseDate] = useState("latest");
  const [codeName, setCodeName] = useState("KRW");
  const [exchangedMoney, setExchangedMoney] = useState(0);
  const [attachment, setAttachment] = useState("");
  const [commentary, setCommentary] = useState("");
  const [today, setToday] = useState("2022-06-01");

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
    const piggyObj = {
      id: uuidv4(),
      useremail: userid,
      food: food,
      country: country,
      foodExpense: foodExpense,
      exchangedMoney: exchangedMoney,
      currencyCode: codeName,
      commentary: commentary,
      tripDate: chooseDate,
      imageURL: attachment,
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
        setCommentary("");
        handleClearAttachment();
        setOpen(!open);
        setReload(!reload);
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
    const controller = new AbortController();
    const getCountryList = async () => {
      try {
        const response = await axios.post("/api/currency", {
          signal: controller.signal,
        });
        let wildList = [...response.data.trList];
        setCountryList(wildList.slice(1));
        getToday();
      } catch (error) {
        alert("죄송합니다. 다시 시도해주세요!");
      }
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
    getCountryList();
    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const getKrwCurrency = async () => {
      if (chooseDate !== undefined && codeName !== "") {
        try {
          const response = await axios.get(
            `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/${chooseDate}/currencies/${codeName.toLowerCase()}.json`,
            {
              signal: controller.signal,
            }
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
    getKrwCurrency();
    return () => {
      controller.abort();
    };
  }, [codeName, chooseDate]);

  useEffect(() => {
    handleMoney();
  }, [foodExpense]);

  return (
    <form method="post" className="piggy-form" onSubmit={handleSubmit}>
      <label htmlFor="trip-day">
        1. 기록하고 싶은 여행날짜를 선택하세요! <br />
        선택하지 않으시면 오늘 날짜로 기록됩니다.
      </label>
      <br />
      <input
        type="date"
        id="trip-date"
        name="trip-day"
        className="piggy-input"
        value={chooseDate}
        min="2018-01-01"
        max={today}
        onChange={handleDate}
      />
      <br />
      <label htmlFor="choose-country">2. 여행 중인 나라를 선택해주세요!</label>
      <select id="country-select" onChange={onSelect}>
        <option value="USD">--나라를 선택해주세요--</option>
        {countryList.map((item, index) => (
          <option key={index} value={[item.currencyName, item.country]}>
            화폐 : {item.currencyName}, 나라이름 : {item.country}
          </option>
        ))}
      </select>
      <br />
      <label htmlFor="food">3. 음식 이름을 기록해주세요</label>
      <br />
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
      <label htmlFor="food-image">4. 음식의 사진을 등록해주세요!</label>
      <br />
      <input
        type="file"
        name="food-image"
        className="piggy-input"
        ref={fileInput}
        accept="image/*"
        onChange={onFileChange}
      />
      <br />
      {attachment && (
        <div className="preview">
          <img src={attachment} alt="preview" width="70px" height="70px" />
          <button onClick={handleClearAttachment}>X</button>
        </div>
      )}
      <br />
      <label htmlFor="comment">5. 음식에 대해 기록하세요!</label>
      <br />
      <textarea
        id="commentary"
        name="comment"
        ref={commentaryRef}
        className="piggy-input"
        onChange={() => setCommentary(commentaryRef.current.value)}
      >
        {commentary}
      </textarea>

      <br />
      <label htmlFor="foodExpense">
        6.금액을 숫자로 입력해주세요! <br />
        예시: 500엔이면 500
      </label>
      <br />
      <input
        type="number"
        id="foodExpense"
        name="foodExpense"
        ref={foodExpenseinputRef}
        className="piggy-input"
        onChange={() => setFoodExpense(foodExpenseinputRef.current.value)}
        value={foodExpense}
        required
      />
      <br />
      <label htmlFor="exchangedMoney">한국 돈으로 바뀐 금액입니다.</label>
      <br />
      <input
        type="number"
        id="exchangedMoney"
        name="exchangedMoney"
        ref={krwinputRef}
        className="piggy-input"
        value={Math.round(krw * foodExpense)}
        readOnly
      />
      <br />
      <button onClick={removeAmount}>입력한 금액 0으로 돌리기</button>
      <br />
      <input className="piggy-btn" type="submit" value="7. 입력 완료!" />
    </form>
  );
};

export default PiggyFactory;
