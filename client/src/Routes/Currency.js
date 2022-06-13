import axios from "axios";
import React, { useState } from "react";

const Currency = () => {
  const [countryList, setCountryList] = useState([]);
  const getCountryList = async () => {
    const response = await axios.post("/api/currency");
    console.log(response);
    setCountryList(response.data.trList);
  };
  return (
    <div>
      Currency
      <label htmlFor="country-select">나라를 선택해주세요!</label>
      <select name="country" id="country-select">
        <option value="">--나라를 선택해주세요--</option>
        {countryList.map((item) => (
          <option key={item.country} value={item.currencyName}>
            {item.country}
          </option>
        ))}
      </select>
      <button onClick={getCountryList}>클릭</button>
    </div>
  );
};

export default Currency;
