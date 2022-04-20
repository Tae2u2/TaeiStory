const express = require("express");

const indexRout = require("./routes/index2");
const usersRout = require("./routes/UsersRout");
const piggyRout = require("./routes/PiggyRout");
const adminRout = require("./routes/AdminRout");

const app = express();

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/client/build/index.html");
});
app.use(express.static("client/build"));

app.use("/", indexRout);
app.use("/api/register", usersRout);
app.use("/api/LoginForm", usersRout);
app.use("/api/piggyboss", piggyRout);
app.use("/api/admin", adminRout);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Loading on port ${port}`));

module.exports = app;
