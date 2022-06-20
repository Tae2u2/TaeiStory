import axios from "axios";
import React, { useState } from "react";
import EditFactory from "./EditFactory";

const PiggysList = ({
  myfood,
  mymoney,
  id,
  regdate,
  setReload,
  reload,
  tripCountry,
  tripDate,
  krwMoney,
  attachment,
  code,
}) => {
  const [openEdit, setOpenEdit] = useState(false);

  const handleDelete = async (event) => {
    const pTarget = event.target.getAttribute("id");
    const sayYes = window.confirm("정말 삭제하시겠습니까?");
    if (sayYes) {
      const response = await axios.post("/api/piggyboss?type=delete", {
        is_id: pTarget,
      });
      if (response.data === "succ") {
        if (reload) {
          setReload(false);
        } else {
          setReload(true);
        }
      } else {
        alert("죄송합니다. 다시 시도해주세요!", "center");
      }
    }
  };
  return (
    <div className="list-box">
      {openEdit && (
        <div className="piggy-edit">
          <span onClick={() => setOpenEdit(!openEdit)}>닫기</span>
          <EditFactory
            id={id}
            reload={reload}
            setReload={setReload}
            myfood={myfood}
            mymoney={mymoney}
            tripCountry={tripCountry}
            tripDate={tripDate}
            krwMoney={krwMoney}
            attachment={attachment}
            code={code}
          />
        </div>
      )}
      <small className="pig-regdate">
        {regdate.substr(0, 4)}년{regdate.substr(4, 2)}월{regdate.substr(6, 2)}일
      </small>
      <div className="for-flex3">
        <h4>{tripCountry} 여행 중!</h4>
        <span>
          {myfood} 먹은 날짜 : {tripDate}
        </span>
        <h3 className="list-h3">
          {myfood} 가격 : {mymoney} {code}
        </h3>
        <h3>
          {myfood} 한국 환전 가격 : {krwMoney.slice(-6, -3)},
          {krwMoney.slice(-3)}원
        </h3>
        <div>
          <img src={attachment} alt="preview" width="250px" />
        </div>

        <div className="pig-mobile">
          <button
            id={id}
            className="piglist-btn"
            onClick={() => setOpenEdit(!openEdit)}
          >
            수정
          </button>
          <button className="piglist-btn" id={id} onClick={handleDelete}>
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default PiggysList;
