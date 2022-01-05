import style from "./css/main.module.css";
import shylogo from "./images/pinehouse.png";

function Topbar() {
  const gone = (event) => {
    event.classList.add("disappear");
  };

  return (
    <div>
      <div className={style.topAdZone}>
        <h4 className={style.topAd}>리액트JS를 이용한 포트폴리오입니다.</h4>
        <span className={style.topAdx}>
          <ion-icon name="close-outline"></ion-icon>
        </span>
      </div>
      <div className={style.topNavZone}>
        <div className={style.topNavLogo}>
          <img className={style.topNavLogoImg} src={shylogo} alt="logo" />
        </div>
        <nav className={style.topNav}>
          <ul className={style.topUl}>
            <li className={style.topLi}>Home</li>
            <li className={style.topLi}>skills</li>
            <li className={style.topLi}>works</li>
            <li className={style.topLi}>Introduce</li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Topbar;
