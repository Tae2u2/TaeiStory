import React, { useEffect, useRef, useState } from "react";

const Piggys = ({ piggyMoney }) => {
  const [myPig, setMyPig] = useState(0);
  const divRef = useRef();

  useEffect(() => {
    const pigs = Math.floor(parseInt(piggyMoney) / 10000);
    setMyPig(pigs);
    console.log(divRef);
    console.log(divRef.current);
  }, [piggyMoney]);

  return (
    <div className="im-piggyzone">
      <h4>{myPig}</h4>
      {myPig === 0 ? (
        <div>
          <img src={require("../images/pigWhite.png")} alt="your pig" />
        </div>
      ) : (
        <div ref={divRef}>
          <img
            src={require("../images/pigWhite.png")}
            alt="your pig"
            width="50px"
          />
        </div>
      )}
    </div>
  );
};

export default Piggys;
