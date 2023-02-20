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
// 소켓io
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server);

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
    callback(null, Date.now()+"_"+file.originalname);
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
// http로 접속하면 실행 된다.
router.route("/home").get((req, res) => {
  res.writeHead(200, {"Content-Type": "text/html; charset=utf8"});
  res.write("<h1>길동이의 홈페이지</h1>");
  res.end(); 
});

////////
// 클라이언트가 socket으로 접속하면 실행
io.sockets.on("connection", (socket)=>{
  console.log("소켓으로 접속 됨.");
  //console.dir(socket);
  //console.log('connection info: ', socket.request.connection._peername);
  //socket.remoteAddress = socket.request.connection._peername.address;
  //socket.remotePort = socket.request.connection._peername.port;
  //console.log("remoteAddress: ", remoteAddress);
  //console.dir(socket.request.connection._peername.address);
  //console.dir(socket.request.connection);

  socket.emit("news", "hello world!");
  socket.on("hi", (data)=> {
    console.log("client : ", data);
  });

  // 접속 된 모든 소켓에 메세지 전달.
  io.sockets.emit("this", {will: "be recevied by everyone"});

  // private message - socket매개 변수.
  socket.on("private message", (from, msg) => {
    console.log("from: " + from, ", msg: " + msg);
  });
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

server.listen(app.get("port"), () => {
  console.log("Node.js 서버 실행 중 ... http://localhost:" + app.get("port"));
});