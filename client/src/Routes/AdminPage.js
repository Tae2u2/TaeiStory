import React, { useEffect, useState } from "react";
import cookie from "react-cookies";
import ReactPaginate from "react-paginate";
import axios from "axios";
import "../css/admin.scss";
import { Link } from "react-router-dom";

const AdminPage = () => {
  const [piggyArr, setPiggyArr] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [reAdmin, setReAdmin] = useState(false);

  const userPerPage = 10;
  const pagesVisited = pageNumber * userPerPage;

  const handleLogout = () => {
    cookie.remove("userid", { path: "/" });
    cookie.remove("username", { path: "/" });
    cookie.remove("userflag", { path: "/" });
    cookie.remove("userpassword", { path: "/" });
    window.location.href = "/";
  };

  const handleUserAdmin = async (event) => {
    const eTarget = event.target.getAttribute("id");
    const sayYes = window.confirm("이 사용자를 강제로 탈퇴시키실건가요?");
    if (sayYes) {
      const confirm2 = window.prompt(
        '아래 입력창에 "관리자 승인" 라고 적어주세요!'
      );
      if (confirm2 === "관리자 승인") {
        const response = await axios.post("/api/LoginForm?type=deleteUser", {
          is_id: eTarget,
        });
        const response2 = await axios.post("/api/piggyboss?type=deleteall", {
          is_Email: eTarget,
        });
        if (response.data === "succ" && response2.data === "succ") {
          alert("사용자가 삭제되었습니다.");
          if (reAdmin) {
            setReAdmin(false);
          } else {
            setReAdmin(true);
          }
        } else {
          alert("사용자 삭제 실패");
        }
      } else {
        alert("문구를 잘못입력하셨습니다. 다시 시도해주세요.");
      }
    } else {
      return false;
    }
  };

  const displayAll = piggyArr
    .slice(pagesVisited, pagesVisited + userPerPage)
    .map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.username}</td>
          <td>{item.useremail}</td>
          <td>{item.reg_date}</td>
          <td>
            {item.userflag !== "A" && (
              <button id={item.useremail} onClick={handleUserAdmin}>
                사용자삭제
              </button>
            )}
          </td>
        </tr>
      );
    });

  const pageCount = Math.ceil(piggyArr.length / userPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    async function fetchData() {
      const response2 = await axios.post("api/admin?type=allList");
      setPiggyArr(response2.data.json);
    }
    fetchData();
  }, [reAdmin]);

  return (
    <div className="im-home">
      <span id="admin-span">
        <Link to="/piggy">메인화면으로 돌아가기</Link>
      </span>
      <button id="admin-btn" onClick={handleLogout}>
        로그아웃하기
      </button>
      <div className="admin-page">
        <table>
          <thead>
            <tr>
              <th>사용자이름(닉네임)</th>
              <th>사용자아이디(이메일)</th>
              <th>등록날짜</th>
              <th>사용자관리</th>
            </tr>
          </thead>
          <tbody>{displayAll}</tbody>
        </table>
        <ReactPaginate
          previousLabel={"◀"}
          nextLabel={"▶"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"disabledBttn"}
          activeClassName={"activeBttn"}
        />
      </div>
    </div>
  );
};

export default AdminPage;
