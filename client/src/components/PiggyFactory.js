import React, { useRef, useState, useEffect, useMemo } from "react";
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

  const getCountryList = async () => {
    const response = await axios.post("/api/currency");
    let wildList = [...response.data.trList];
    setCountryList(wildList.slice(1));
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
        alert("???????????????. ?????? ??????????????????!", "center");
        return false;
      }
    } catch (error) {
      alert("???????????????. ?????? ??????????????????!", "center");
      return false;
    }
  };

  const printList = useMemo(() => {
    getCountryList();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
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
    getToday();
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
            alert("???????????????. ?????? ??????????????????");
          } else {
            let list = Object.values(response.data);
            let currencyObj = { ...list[1] };
            setKrw(currencyObj["krw"]);
          }
        } catch (error) {
          return false;
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
        1. ???????????? ?????? ??????????????? ???????????????! <br />
        ???????????? ???????????? ?????? ????????? ???????????????.
      </label>
      <br />
      <input
        type="date"
        id="trip-date"
        name="trip-day"
        className="piggy-input"
        value={chooseDate}
        min="2020-11-22"
        max={today}
        onChange={handleDate}
      />
      <br />
      <label htmlFor="choose-country">2. ?????? ?????? ????????? ??????????????????!</label>
      <br />
      <select id="country-select" onChange={onSelect}>
        <option value="USD">--????????? ??????????????????--</option>
        {countryList.map((item, index) => (
          <option key={index} value={[item.currencyName, item.country]}>
            ?????? : {item.currencyName}, ???????????? : {item.country}
          </option>
        ))}
      </select>
      <br />
      <label htmlFor="food">3. ?????? ????????? ??????????????????</label>
      <br />
      <input
        type="text"
        id="food"
        name="food"
        className="piggy-input"
        required
        ref={foodinputRef}
        value={food}
        requiredtitle="????????? ??????????????????!"
        onChange={() => setfood(foodinputRef.current.value)}
      />
      <br />
      <label htmlFor="food-image">4. ????????? ????????? ??????????????????!</label>
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
      <label htmlFor="comment">5. ????????? ?????? ???????????????!</label>
      <br />
      <textarea
        id="commentary"
        name="comment"
        ref={commentaryRef}
        value={commentary}
        className="piggy-input"
        onChange={() => setCommentary(commentaryRef.current.value)}
      ></textarea>

      <br />
      <label htmlFor="foodExpense">
        6.????????? ????????? ??????????????????! <br />
        ??????: 500????????? 500
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
      <label htmlFor="exchangedMoney">?????? ????????? ?????? ???????????????.</label>
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
      <button onClick={removeAmount}>????????? ?????? 0?????? ?????????</button>
      <br />
      <input className="piggy-btn" type="submit" value="7. ?????? ??????!" />
    </form>
  );
};

export default PiggyFactory;
