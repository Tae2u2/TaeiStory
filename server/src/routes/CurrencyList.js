//https://www.iban.com/currency-codes
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/", (req, res, next) => {
  const getHtml = async () => {
    try {
      return await axios.get("https://www.iban.com/currency-codes");
    } catch (error) {
      console.error(error);
    }
  };

  getHtml().then((html) => {
    let trList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $(
      "table.table.table-bordered.downloads.tablesorter tbody"
    ).children("tr");
    const sentence = $bodyList.toString();
    const cutTr = sentence.split("<tr>");

    cutTr.forEach((element, i) => {
      const tdCountry = element.split("</td>")[0];
      const currencyName = element.split("</td>")[2];

      const country = tdCountry.slice(9);
      let currency;
      if (currencyName !== undefined) {
        currency = currencyName.slice(9);
      }
      trList[i] = {
        country: country,
        currencyName: currency,
      };
    });
    res.send({ trList });
  });
});

module.exports = router;
