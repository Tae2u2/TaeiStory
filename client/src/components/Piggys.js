import React, { useEffect, useRef, useState } from "react";

const Piggys = ({ piggyMoney }) => {
  const [myPig, setMyPig] = useState("pigWhite.png");
  const [level, setLevel] = useState(0);
  const divRef = useRef();

  useEffect(() => {
    const pigs = Math.floor(parseInt(piggyMoney) / 10000);
    setLevel(pigs);
    if (pigs < 10) {
      setMyPig("basicpig.png");
    } else if (pigs < 20) {
      setMyPig("backpig.png");
    } else if (pigs < 30) {
      setMyPig("deliverypig.png");
    } else if (pigs < 40) {
      setMyPig("outpig.png");
    } else {
      setMyPig("lightpig.png");
    }
  }, [piggyMoney]);

  return (
    <div className="im-piggyzone">
      <h4>당신의 돼지짱 레벨 : {level}</h4>
      {myPig === 0 ? (
        <div>
          <img src={require("../images/pigWhite.png")} alt="your pig" />
        </div>
      ) : (
        <div ref={divRef}>
          <img src={require("../images/" + myPig)} alt="your pig" />
        </div>
      )}
    </div>
  );
};

export default Piggys;
