const express = require("express");

const indexRouter = require("./routes/index2");
const usersRouter = require("./routes/UsersRout");

const app = express();

app.use("/", indexRouter);
app.use("/api/register", usersRouter);
app.use("/api/LoginForm", usersRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Loading on port ${port}`));

module.exports = app;
