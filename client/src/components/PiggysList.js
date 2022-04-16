import axios from "axios";
import React, { useState } from "react";

const PiggysList = ({ myfood, mymoney, id, regdate, setWatch, watch }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [efood, setEfood] = useState(myfood);
  const [efoodExpense, setEfoodExpense] = useState(mymoney);

  const handleDelete = async (event) => {
    const pTarget = event.target.getAttribute("id");
    const sayYes = window.confirm("삭제하시겠습니까?");
    if (sayYes) {
      const response = await axios.post("/api/piggyboss?type=delete", {
        is_id: pTarget,
      });
      if (watch) {
        setWatch(false);
      } else {
        setWatch(true);
      }
    }
  };

  const handleOpen = () => {
    if (openEdit) {
      setOpenEdit(false);
    } else {
      setOpenEdit(true);
    }
  };

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "efoodExpense") {
      setEfoodExpense(value);
    } else if (name === "efood") {
      setEfood(value);
    }
  };

  const handleEdit = async (event) => {
    const eTarget = event.target.getAttribute("id");
    if (efood === myfood && efoodExpense === mymoney) {
      alert("변경된 사항이 없습니다.");
      return false;
    }

    const response = await axios.post("/api/piggyboss?type=modifypiggy", {
      is_id: eTarget,
      e_food: efood,
      e_foodExpense: efoodExpense,
    });
    console.log(response);
    setEfood("");
    setEfoodExpense("");
    handleOpen();
    if (watch) {
      setWatch(false);
    } else {
      setWatch(true);
    }
  };

  return (
    <div className="list-box">
      {openEdit && (
        <div className="piggy-modal">
          <form id={id} onSubmit={handleEdit} className="modal-form">
            <div className="modal-input-div">
              <label>음식</label>
              <input
                type="text"
                name="efood"
                className="modal-input"
                placeholder={myfood}
                onChange={onChange}
              />
              <br />
              <label>금액</label>
              <input
                type="text"
                className="modal-input"
                name="efoodExpense"
                placeholder={mymoney}
                onChange={onChange}
              />
            </div>
            <div className="pig-modal">
              <input type="submit" className="piglist-btn" value="수정" />
              <button className="piglist-btn" onClick={handleOpen}>
                취소
              </button>
            </div>
          </form>
        </div>
      )}
      <small className="pig-regdate">
        {regdate.substr(0, 4)}년{regdate.substr(4, 2)}월{regdate.substr(6, 2)}일
      </small>
      <div className="for-flex3">
        <h3 className="list-h3">
          {myfood}를 {mymoney}원에 드셨습니다.
        </h3>
        <div className="pig-mobile">
          <button id={id} className="piglist-btn" onClick={handleOpen}>
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
