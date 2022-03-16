const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/", (req, res, next) => {
  const type = req.query.type;
  if (type === "inputpiggy") {
    //회원가입 정보 삽입
    try {
      // Mysql Api 모듈(CRUD)
      const dbconnect_Module = require("./dbconnect_Module");

      //Mysql 쿼리 호출정보 입력
      req.body.mapper = "PiggyMapper"; //mybatis xml 파일명
      req.body.crud = "insert"; //select, insert, update, delete 중에 입력
      req.body.mapper_id = "insertPiggy";

      router.use("/", dbconnect_Module);
      next("route");
    } catch (error) {
      console.log("Module > dbconnect error : " + error);
    }
  } else if (type === "piggylist") {
    try {
      // Mysql Api 모듈(CRUD)
      const dbconnect_Module = require("./dbconnect_Module");

      //Mysql 쿼리 호출정보 입력
      req.body.mapper = "PiggyMapper"; //mybatis xml 파일명
      req.body.crud = "select"; //select, insert, update, delete 중에 입력
      req.body.mapper_id = "selectPiggy";
      router.use("/", dbconnect_Module);
      next("route");
    } catch (error) {
      console.log("Module > dbconnect error 피기리스트: " + error);
    }
  }
});

module.exports = router;
