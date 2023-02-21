const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const router = express.Router();
const cookieParser = require("cookie-parser");
// 소켓io
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
process.env.PORT = 3000;
app.set("port", process.env.PORT || 3001);

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
/////// router -------
// http로 접속하면 실행 된다.
router.route("/home").get((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf8" });
    res.write("<h1>길동이의 홈페이지</h1>");
    res.end();
});

////////
// 접속한 소켓을 저장하는 객체 준비
const clientSocketMap = {};
// 클라이언트가 socket으로 접속하면 실행
io.sockets.on("connection", (socket) => {
    console.log("소켓으로 접속 됨.");

    socket.on('linesend', function (data) {
        console.log(data);
        socket.broadcast.emit('linesend_tocllinet', data);
    });

    socket.on("login", function (data) {
        data.socketId = socket.id;
        clientSocketMap[data.userId] = data;
        console.dir(clientSocketMap);
    });
    socket.on("send", function (data) {
        //console.log(io.sockets.sockets.get(socket.id));
        if (data.receive === "All") {
            io.sockets.emit("send message", data);
            return;
        }
        let test01SocketId = clientSocketMap[data.receive].socketId;
        if (test01SocketId) {
            let test01Socket = io.sockets.sockets.get(test01SocketId);
            test01Socket.emit("send message", data);
        }
    });

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