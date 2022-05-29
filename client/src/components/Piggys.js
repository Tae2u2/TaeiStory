import React, { useEffect, useState } from "react";

const Piggys = ({ piggyMoney }) => {
  const [myPig, setMyPig] = useState("basicpig.png");
  const [level, setLevel] = useState(0);
  const [message, setMessage] = useState("Hello");

  useEffect(() => {
    const pigs = Math.floor(parseInt(piggyMoney) / 10000);
    setLevel(pigs);
    if (pigs < 10) {
      setMyPig("basicpig.png");
      setMessage("돼지니까...청춘이다...");
    } else if (pigs < 20) {
      setMyPig("backpig.png");
      setMessage("집밥은 돈 별로 안들어유");
    } else if (pigs < 30) {
      setMyPig("deliverypig.png");
      setMessage("요즘 배달비 넘 비싸다.. 꿀꿀..");
    } else if (pigs < 40) {
      setMyPig("outpig.png");
      setMessage("코로나도 돼근거리는 내 심장을 막지 못 해!");
    } else {
      setMyPig("lightpig.png");
      setMessage("그저 꿀꿀..진정한 돼지짱이자 소상공인들의 희망이십니다.");
    }
  }, [piggyMoney]);

  return (
    <div className="im-piggyzone2">
      <h4 className="pig-level-mobile">
        당신의 돼지력 지수 : <span className="pig-level">{level}</span>
      </h4>
      <div>
        <div className="pig-img">
          <img
            src={require("../images/" + myPig)}
            alt="your pig"
            width="280px"
            height="280px"
          />
        </div>
        <p className="pig-p">{message}</p>
      </div>
    </div>
  );
};

export default Piggys;
