/*
    REST- 계산기
*/

const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const router = express.Router();
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");

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
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + "/public"));


/////// router -------
router.route("/home").get((req, res) => {
  res.writeHead(200, {"Content-Type": "text/html; charset=utf8"});
  res.write("<h1>길동이의 홈페이지</h1>");
  res.end(); 
});

// Node.js 계산기
// REST 방식으로 처리 - Ajax로 처리 한다.
// post man으로 테스트 하기
router.route("/calc/:x/:y").get((req, res)=>{
  console.log("GET - /calc/:x/:y ... 더하기");
  res.end(String(Number(req.params.x) + Number(req.params.y)));
});
router.route("/calc/:x/:y").post((req, res)=>{
  console.log("POST - /calc/:x/:y ... 빼기");
  res.end(String(Number(req.params.x) - Number(req.params.y)));
});
router.route("/calc/:x/:y").put((req, res)=>{
  console.log("PUT - /calc/:x/:y ... 곱하기");
  res.end(String(Number(req.params.x) * Number(req.params.y)));
});
router.route("/calc/:x/:y").delete((req, res)=>{
  console.log("DELETE - /calc/:x/:y ... 나누기");
  res.end(String(Number(req.params.x) / Number(req.params.y)));
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