var express = require("express");

var router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }));

router.post("/", (req, res, next) => {
  var type = req.query.type;
  if (type == "list") {
    //Swtool 리스트 조회
    try {
      //Mysql 모듈(CRUD)
      var dbconnect_Module = require("./dbconnect_Module");

      //MySql 쿼리 호출 정보입력
      req.body.mapper = "SwToolMapper"; //mybatis xml 파일명
      req.body.crud = "select";
      req.body.mapper_id = "selectSwToolsList";

      router.use("/", dbconnect_Module);
      next("route");
    } catch (error) {
      console.log("Module > dbconnect error : " + error);
    }
  }
});

module.exports = router;
