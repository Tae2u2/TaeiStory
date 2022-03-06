const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const bcrypt = require("bcrypt");
const saltRounds = 10;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/", (req, res, next) => {
  const type = req.query.type;
  if (type === "signup") {
    //회원가입 정보 삽입
    try {
      // Mysql Api 모듈(CRUD)
      const dbconnect_Module = require("./dbconnect_Module");

      //Mysql 쿼리 호출정보 입력
      req.body.mapper = "UserMapper"; //mybatis xml 파일명
      req.body.crud = "insert"; //select, insert, update, delete 중에 입력
      req.body.mapper_id = "insertUser";

      const myPlaintextPassword = req.body.is_Password;
      if (myPlaintextPassword != "" && myPlaintextPassword != undefined) {
        bcrypt.genSalt(saltRounds, function (err, salt) {
          bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
            req.body.is_Password = hash;
            router.use("/", dbconnect_Module);
            next("route");
          });
        });
      } else if (type == "sign in") {
        try {
          const dbconnect_Module = require("./dbconnect_Module");

          //Mysql 쿼리 호출정보 입력
          req.body.mapper = "UserMapper"; //mybatis xml 파일명
          req.body.crud = "select"; //select, insert, update, delete 중에 입력
          req.body.mapper_id = "selectLoginCheck";

          router.use("/", dbconnect_Module);
          next("next");
        } catch (error) {
          console.log("Module > (user login)dbconnect error : " + error);
        }
      } else {
        router.use("/", dbconnect_Module);
        next("route");
      }
    } catch (error) {
      console.log("Module > dbconnect error : " + error);
    }
  } else if (type == "dplicheck") {
    //이메일 중복체크
    try {
      // Mysql Api 모듈(CRUD)
      const dbconnect_Module = require("./dbconnect_Module");

      //Mysql 쿼리 호출정보 입력
      req.body.mapper = "UserMapper"; //mybatis xml 파일명
      req.body.crud = "select"; //select, insert, update, delete 중에 입력
      req.body.mapper_id = "selectUserDpliCheck";
      router.use("/", dbconnect_Module);
      next("route");
    } catch (error) {
      console.log("Module > dbconnect error : " + error);
    }
  }
});

module.exports = router;
