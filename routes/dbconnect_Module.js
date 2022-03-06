const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }));

//mysql information
const connection = mysql.createConnection({
  host: "tae2data.chtmlzgambqy.us-east-1.rds.amazonaws.com",
  port: "3306",
  database: "react",
  user: "admin",
  password: "xodlepdlxj",
});

router.post("/", (req, res) => {
  const mybatisMapper = require("mybatis-mapper");
  var param = req.body;

  //mybatis mapper 경로설정
  mybatisMapper.createMapper(["./routes/models/" + param.mapper + ".xml"]);
  var time = new Date();
  console.log("## " + time + " ##");
  console.log("\n Called Mapper Name =" + param.mapper);

  var format = { language: "sql", indent: " " };
  //mysql 쿼리 정보 세팅
  var query = mybatisMapper.getStatement(
    param.mapper,
    param.mapper_id,
    param,
    format
  );
  console.log("\n===========Node Mybatis Query Log Start =======");
  console.log(
    "* mapper namespace : " + param.mapper + "." + param.mapper_id + " *\n"
  );
  console.log(query + "\n");

  connection.query(query, function (error, results) {
    if (error) {
      console.log("db error****** : " + error);
    }
    var time2 = new Date();
    console.log("## " + time2 + " ##");
    console.log("## RESULT DATA LIST ## : \n", results);
    if (results != undefined) {
      string = JSON.stringify(results);
      var json = JSON.parse(string);
      if (req.body.crud == "select") {
        if (param.mapper_id == "selectLoginCheck") {
          if (json[0] == undefined) {
            res.send(null);
          } else {
            bcrypt.compare(
              req.body.is_Password,
              json[0].userpassword,
              function (err, login_flag) {
                if (login_flag == true) {
                  res.send({ json });
                } else {
                  res.send(null);
                }
              }
            );
          }
        } else {
          res.send({ json });
        }
      } else {
        res.send("succ");
      }
    } else {
      res.send("error");
    }
    connection.release();
    console.log("========Node Mybatis Query Log End============\n");
  });
});

module.exports = router;
