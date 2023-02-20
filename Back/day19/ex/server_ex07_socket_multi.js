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
const { Server } = require("socket.io");
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
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use("/uploads", express.static(__dirname + "/uploads"));

// post 전송 방식을 사용하기 때문에 bodyParser가 먼저 선언 되어야 한다.
let storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "uploads");
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + "_" + file.originalname);
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
    res.writeHead(200, { "Content-Type": "text/html; charset=utf8" });
    res.write("<h1>길동이의 홈페이지</h1>");
    res.end();
});

////////
// 클라이언트가 socket으로 접속하면 실행
io.of("/chat").on("connection", (socket) => {
    console.log("/chat 소켓으로 접속 됨.");
    socket.emit("chat message", { hello: "chat!" });

    socket.on("disconnect", function () {
        console.log("/chat 클라이언트 접속이 해제 됨.");
    });
});

io.of("/news").on("connection", (socket) => {
    console.log("/news 소켓으로 접속 됨.");
    socket.emit("news message", { hello: "news!" });

    socket.on("disconnect", function () {
        console.log("/chat 클라이언트 접속이 해제 됨.");
    });
});

app.use("/", router);
/////// error handler -----
var expressErrorHandler = require('express-error-handler');
var errorHandler = expressErrorHandler({
    static: {
        '404': './public/404.html'
    }
});
app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

server.listen(app.get("port"), () => {
    console.log("Node.js 서버 실행 중 ... http://localhost:" + app.get("port"));
});