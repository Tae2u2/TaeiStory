import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";

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
  code,
}) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [efood, setEfood] = useState(myfood);
  const [efoodExpense, setEfoodExpense] = useState(mymoney);

  const saveAlert = (flag, positionflag) => {
    Swal.fire({
      position: positionflag,
      icon: "success",
      title: flag,
      showConfirmButton: false,
      timer: 1000,
    });
  };

  const handleDelete = async (event) => {
    const pTarget = event.target.getAttribute("id");
    const sayYes = await Swal.fire({
      title: "정말 삭제하시겠습니까?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#2f0059",
      cancelButtonColor: "#90b029",
      confirmButtonText: "예",
      cancelButtonText: "아니요",
    });
    if (sayYes.isConfirmed) {
      const response = await axios.post("/api/piggyboss?type=delete", {
        is_id: pTarget,
      });
      if (response.data === "succ") {
        saveAlert("삭제 성공!", "center");
        if (reload) {
          setReload(false);
        } else {
          setReload(true);
        }
      } else {
        saveAlert("죄송합니다. 다시 시도해주세요!", "center");
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
      saveAlert("변경사항이 없습니다.", "center");
    } else {
      const response = await axios.post("/api/piggyboss?type=modifypiggy", {
        is_id: eTarget,
        e_food: efood,
        e_foodExpense: efoodExpense,
      });
      handleOpen();
      if (response.data === "succ") {
        if (reload) {
          setReload(false);
        } else {
          setReload(true);
        }
      } else {
        saveAlert("죄송합니다. 다시 시도해주세요!", "center");
      }
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
                value={efood}
                onChange={onChange}
              />
              <br />
              <label>금액</label>
              <input
                type="text"
                className="modal-input"
                name="efoodExpense"
                value={efoodExpense}
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
