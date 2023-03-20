var express = require("express");
var bodyParser = require("body-parser");
var multer = require("multer");
var upload = multer();
var cors = require("cors");

var app = express();

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static("public"));

// for CORS
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/registration", function (req, res) {
  console.log(req.body);
  res.send("recieved your request!");
});
app.listen(3000);
