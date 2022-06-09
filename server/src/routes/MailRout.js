const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const fs = require("fs");
const env = require("dotenv");
env.config();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

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

  home_url = "http://localhost:3000";
  let toHtml = "";
  fs.readFile(__dirname + "/template/mail_template.html", function (err, html) {
    toHtml = html.toString();
    toHtml = toHtml.replace("{replacetext}", home_url + "/authcheck");
  });

  setTimeout(
    function () {
      let mailOptions = {
        from: process.env.MAIL_USER,
        to: email,
        subject: "돼지짱 인증메일입니다.",
        html: toHtml,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          res.send("error");
        } else {
          console.log("Email sent: " + info.response);
          res.send("succ");
        }
      });
    }.bind(this),
    1000
  );
});

module.exports = router;
