const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const router = express.Router();
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
// npm i multer -S
const multer = require("multer");
const fs = require("fs");

app.set("views", __dirname + "/views"); 
app.set("view engine", "ejs");
process.env.PORT = 3000;
app.set("port", process.env.PORT || 3001);

app.use(cookieParser());
app.use(expressSession({
  secret: 'my key',
  resave: true,
  saveUninitialized: true
}));
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.use("/uploads",express.static(__dirname + "/uploads"));

// post 전송 방식을 사용하기 때문에 bodyParser가 먼저 선언 되어야 한다.
let storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, "uploads");
  },
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
// 파일 제한 : 10, 1G이하로 제한.
let upload = multer({
  storage: storage,
  limit: {
    files: 10, 
    fileSize: 1024 * 1024 * 1024
  }
})




/////// router -------
router.route("/home").get((req, res) => {
  res.writeHead(200, {"Content-Type": "text/html; charset=utf8"});
  res.write("<h1>길동이의 홈페이지</h1>");
  res.end(); 
});

router.route("/process/photo").post(upload.array("photo", 1), (req, res)=>{
  console.log("POST - /process/photo 호출 ...");
  console.log(req.files);

  res.end("file upload!");
});


app.use("/", router);

/////// error handler -----
var expressErrorHandler = require('express-error-handler');
var errorHandler = expressErrorHandler({
    static : {
        '404':'./public/404.html'
    }
});
app.use(expressErrorHandler.httpError(404) );
app.use(errorHandler );


const server = http.createServer(app);
server.listen(app.get("port"), () => {
  console.log("Node.js 서버 실행 중 ... http://localhost:" + app.get("port"));
});