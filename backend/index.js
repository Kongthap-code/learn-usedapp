const express = require("express");
const fs = require("fs");
const app = express();
const port = 3001;

app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Method", "POST");
  res.set("Access-Control-Allow-Headers", "content-type");
  res.set("Access-Control-Allow-Credentials", "true");
  next();
});

app.get("/image/:id", (req, res) => {
  fs.readFile("./images/" + req.params.id + ".json", function (err, data) {
    res.setHeader("Content-Type", "application/json");
    res.end(data)
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
