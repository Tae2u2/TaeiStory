const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const fs = require("fs");
const env = require("dotenv");
env.config({ path: __dirname + "/env/.env" });

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

function createNumber(min, max) {
  let number = Math.floor(Math.random() * (max - min + 1)) + min;
  return number;
}
let randomNum = createNumber(10000, 99999);

router.post("/", (req, res, next) => {
  let email = req.body.is_Email;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  let toHtml = "";
  fs.readFile(__dirname + "/template/mail_template.html", function (err, html) {
    toHtml = html.toString();
    toHtml = toHtml.replace("{replacetext}", randomNum);
  });

  setTimeout(
    function () {
      let mailOptions = {
        from: process.env.MAIL_USER,
        to: email,
        subject: "돼지짱 인증메일입니다.",
        text: `인증번호는 : ${randomNum} 입니다.
        돼지짱페이지로 돌아가 입력해주세요!`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          res.send("error");
        } else {
          console.log("Email sent: " + info.response);
          res.send({ randomNum });
        }
      });
    }.bind(this),
    1000
  );
});

module.exports = router;
