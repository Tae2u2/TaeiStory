import axios from "axios";
import React, { useState } from "react";
import EditFactory from "./EditFactory";
import { FaEllipsisV } from "react-icons/fa";

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
  commentary,
  attachment,
  code,
}) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [list, setList] = useState(false);

  const handleDelete = async (event) => {
    const pTarget = event.target.getAttribute("id");
    const sayYes = window.confirm("정말 삭제하시겠습니까?");
    if (sayYes) {
      const response = await axios.post("/api/piggyboss?type=delete", {
        is_id: pTarget,
      });
      if (response.data === "succ") {
        setReload(!reload);
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
            commentary={commentary}
            tripCountry={tripCountry}
            tripDate={tripDate}
            krwMoney={krwMoney}
            attachment={attachment}
            code={code}
            setOpenEdit={setOpenEdit}
            openEdit={openEdit}
          />
        </div>
      )}
      <small className="pig-regdate">
        {regdate.substr(0, 4)}년{regdate.substr(4, 2)}월{regdate.substr(6, 2)}일
      </small>
      <h2>{tripCountry} 여행 중!</h2>
      <div className="list-image">
        {attachment !== null && (
          <img src={attachment} alt="preview" width="300px" />
        )}
      </div>
      <p className="list-p">
        {myfood} 먹은 날짜 : {tripDate}
        <br />
        {myfood} 가격 : {mymoney} {code}
        <br />
        {myfood} 한국 환전 가격 : {krwMoney.slice(-6, -3)},{krwMoney.slice(-3)}
        원
        <br />
        {commentary}
      </p>
      <hr />
      <span onClick={() => setList(!list)}>
        <FaEllipsisV />
      </span>
      {list && (
        <div className="span-list">
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
      )}
    </div>
  );
};

export default PiggysList;
