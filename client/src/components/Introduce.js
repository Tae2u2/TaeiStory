import React from "react";

const Introduce = () => {
  return (
    <div className="intro-box">
      <h3>당신은 돼지짱입니까?</h3>
      <div className="speech-box">
        <h4>
          "식비를 기록하고 돼지력을 모아 <br />
          돼지의 신이 되어보세요!"
        </h4>
      </div>
      <div className="fairy">
        <img
          src={require("../images/piggys.png")}
          alt="저금통 piggys"
          width="300px"
          height="240px"
        />
      </div>
    </div>
  );
};

export default Introduce;
