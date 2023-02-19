/*
    Cookie / Session
*/

const http = require('http');
const express = require('express');
const app = express();
const router = express.Router();
const cors = require("cors");
// npm i cookie-parser -S
const cookieParser = require("cookie-parser");
// npm i express-session -S
const expressSession = require("express-session");

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

process.env.PORT = 3000;
app.set('port', 3000);

// cookieParser 미들웨어 설정
app.use(cookieParser());

// session 미들웨어 설정
app.use(expressSession({
    secret: 'my key',
    resave: true,
    saveUninitialized: true
}));

// cors 미들웨어 설정
app.use(cors());

// bodyParser 미들웨어 설정 부분
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static 미들웨어 설정 - express 내장
app.use(express.static(__dirname + "/public"));

////// router
router.route("/home").get((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf8" });
    res.write("<h1>길동이의 홈페이지</h1>");
    res.end();
});

router.route("/login").post((req, res) => {
    console.log("POST - /login");
    res.writeHead(200, { "Content-Type": "text/html; charset=utf8" });
    console.log(req.body);
    if(req.session.user) {
        console.log("이미 로그인이 되어 있습니다.");
    } else {
        // 로그인 진행
        req.session.user = {
            id: req.body.id,
            name: "김유신",
            ahuthorized: true
        };
    }
    res.write("<h1>" + req.body.name + "님 로그인 되었습니다.</h1>");
    res.write("<a href='/process/product'>상품 페이지</a>");
    res.end();
});

// 제품 상세 페이지
router.route("/process/product").get((req, res) => {
    console.log("GET - /process/product")
    res.writeHead(200, { "Content-Type": "text/html; charset=utf8" });
    // 제품 상세 페이지 - 로그인이 되어 있지 않으면 Login페이지로 이동
    if(req.session.user) {
        // 로그인 상태
        res.end("<h1>제품 상세 정보</h1>");
        res.write("로그아웃");
        res.end();
    } else {
        // 로그아웃 상태
        res.redirect("/html/loginForm.html");
    }
});

// 로그인 처리
router.route("/login/cookie").post((req, res) => {
    console.log("POST - /login");
    console.log(req.body);
    // 쿠키는 사용자 쪽(Client)에 생성된다. res 적용.
    // npm i cookie-parser -S
    // const cookieParser = require("cookie-parser");
    // app.use(cookieParser());
    res.cookie('user', {
        id: req.body.id,
        password: req.body.passwd,
        name: "김유신",
        ahuthorized: true
    });

    res.redirect("/");
});

// 2) router 미들웨어 설정
app.use("/", router);

//오류 핸들러 모듈 사용
var expressErrorHandler = require('express-error-handler');
//모든 라우터 처리 후 404 오류 페이지 처리
var errorHandler = expressErrorHandler({
    static: {
        '404': './public/404.html'
    }
});
app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

const server = http.createServer(app);
server.listen(app.get('port'), () => {
    console.log("Node.js 서버 실행 중 ... http://localhost:" + app.get('port'));
});