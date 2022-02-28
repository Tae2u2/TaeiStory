function Topbar() {
  const gone = (event) => {
    event.classList.add("disappear");
  };

  return (
    <div>
      <div>
        <h4>리액트JS를 이용한 포트폴리오입니다.</h4>
        <span>x</span>
      </div>
      <div>
        <nav>
          <ul>
            <li>Home</li>
            <li>skills</li>
            <li>works</li>
            <li>Introduce</li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Topbar;
