const express = require("express");
const path = require("path");
const {
  models: { Campuses, Students },
} = require("./db/server");

const app = express();

app.use(express.json());

app.use("/dist", express.static(path.join(__dirname, "../dist")));
app.use(express.static(path.join(__dirname, "../public")));

app.use("/api", require("./routes/campusesRoutes"));
app.use("/api", require("./routes/studentsRoutes"));

//error handling middleware
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = app;
