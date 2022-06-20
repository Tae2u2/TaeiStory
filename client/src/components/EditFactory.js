import React, { useRef, useState, useEffect } from "react";
import axios from "axios";

const EditFactory = ({
  reload,
  setReload,
  id,
  myfood,
  mymoney,
  tripCountry,
  tripDate,
  krwMoney,
  attachment,
  code,
}) => {
  const efoodinputRef = useRef();
  const efoodExpenseinputRef = useRef();
  const krwinputRef = useRef();
  const [eFood, setEfood] = useState(myfood);
  const [eFoodExpense, setEfoodExpense] = useState(mymoney);
  const [countryList, setCountryList] = useState([]);
  const [eCountry, setEcountry] = useState(tripCountry);
  const [krw, setKrw] = useState(0);
  const [eChooseDate, setEchooseDate] = useState(tripDate);
  const [eCodeName, setEcodeName] = useState(code);
  const [eExchangedMoney, setEexchangedMoney] = useState(krwMoney);
  const [eAttachment, setEattachment] = useState(attachment);
  const fileInput = useRef(null);
  const [today, setToday] = useState(tripDate);

  const onSelect = (e) => {
    const {
      target: { value },
    } = e;
    let myvalue = value;
    setEcodeName(myvalue.split(",")[0]);
    setEcountry(myvalue.split(",")[1]);
    if (e.target.value === "") {
      alert("공식화폐가 등록되지 않은 나라는 미국 달러로 표시됩니다.");
      setEcodeName("USD");
      setEcountry(myvalue.split(",")[1]);
    }
  };
  const handleDate = (event) => {
    const {
      target: { value },
    } = event;
    setEchooseDate(value);
  };

  const handleMoney = () => {
    setEexchangedMoney(krwinputRef.current.value);
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
      setEattachment(result);
    };
    if (Boolean(theFile)) {
      reader.readAsDataURL(theFile);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {
      target: { id },
    } = event;

    try {
      const response = await axios.post("/api/piggyboss?type=modifypiggy", {
        is_id: id,
        e_food: eFood,
        e_foodExpense: eFoodExpense,
        e_country: eCountry,
        e_exchangedMoney: eExchangedMoney,
        e_currencyCode: eCodeName,
        e_tripDate: eChooseDate,
        e_imageURL: eAttachment,
      });

      if (response.data === "succ") {
        setReload(!reload);
      } else {
        alert("죄송합니다. 다시 시도해주세요!");
        return false;
      }
    } catch (error) {
      alert("죄송합니다. 다시 시도해주세요!");
      return false;
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const getCountryList = async () => {
      const response = await axios.post("/api/currency", {
        signal: controller.signal,
      });
      let wildList = [...response.data.trList];
      setCountryList(wildList.slice(1));
      getToday();
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
    };
    getCountryList();
    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const getKrwCurrency = async () => {
      try {
        const response = await axios.get(
          `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/${eChooseDate}/currencies/${eCodeName.toLowerCase()}.json`,
          {
            signal: controller.signal,
          }
        );
        if (response.status !== 200) {
          alert("죄송합니다. 다시 시도해주세요❌");
        } else {
          let list = Object.values(response.data);
          let currencyObj = { ...list[1] };
          setKrw(currencyObj["krw"]);
        }
      } catch (error) {
        alert("죄송합니다. 다시 시도해주세요!✅");
      }
    };
    getKrwCurrency();
    return () => {
      controller.abort();
    };
  }, [eCodeName, eChooseDate]);

  useEffect(() => {
    handleMoney();
  }, [eFoodExpense]);

  return (
    <form id={id} method="post" className="piggy-form" onSubmit={handleSubmit}>
      <label htmlFor="trip-day">
        날짜를 변경하시려면 선택하세요! <br />
        선택하지 않으시면 원래 입력된 날짜가 유지됩니다.
      </label>
      <input
        type="date"
        id="trip-date"
        name="trip-day"
        value={eChooseDate}
        min="2018-01-01"
        max={today}
        onChange={handleDate}
      />
      <br />
      <label htmlFor="choose-country">
        여행 중인 나라를 바꾸려면 선택해주세요!
      </label>
      <select id="country-select" onChange={onSelect}>
        <option value="USD">
          --나라가 그대로면 선택하지 않으셔도 됩니다.--
        </option>
        {countryList.map((item, index) => (
          <option key={index} value={[item.currencyName, item.country]}>
            화폐 : {item.currencyName}, 나라이름 : {item.country}
          </option>
        ))}
      </select>
      <br />
      <label htmlFor="efood">무엇을</label>
      <input
        type="text"
        id="efood"
        name="efood"
        className="piggy-input"
        required
        ref={efoodinputRef}
        value={eFood}
        onChange={() => setEfood(efoodinputRef.current.value)}
      />
      <br />
      <input
        type="file"
        ref={fileInput}
        accept="image/*"
        onChange={onFileChange}
      />
      <br />
      {eAttachment && (
        <div>
          <img src={eAttachment} alt="preview" width="70px" height="70px" />
        </div>
      )}

      <br />
      <label htmlFor="efoodExpense">
        음식을 먹고 낸 금액을 입력하세요 <br />
        예시: 500엔이면 500
      </label>
      <input
        type="number"
        id="efoodExpense"
        name="efoodExpense"
        ref={efoodExpenseinputRef}
        className="piggy-input"
        onChange={() => setEfoodExpense(efoodExpenseinputRef.current.value)}
        value={eFoodExpense}
        required
      />
      <br />
      <label htmlFor="eExchangedMoney">한국 돈으로</label>
      <input
        type="number"
        id="eExchangedMoney"
        name="eExchangedMoney"
        ref={krwinputRef}
        className="piggy-input"
        value={Math.round(krw * eFoodExpense)}
        readOnly
      />
      <p>원 입니다.</p>
      <br />
      <input className="piggy-btn" type="submit" value="입력" />
    </form>
  );
};

export default EditFactory;
