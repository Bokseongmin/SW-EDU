/*
    오류페이지
*/

const http = require('http');
const express = require('express');
const app = express();

// 1) router 객체 준비
const router = express.Router();

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

process.env.PORT = 3000;
app.set('port', 3000);

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

// 로그인 처리
//app.post('/login', (req, res) => {
router.route("/login").post((req, res) => {
    console.log("POST - /login");
    // post 방식의 요청 시에는 body에 피라미터가 담겨서 전달된다.
    // bodyParser미들웨어가 설정 되어야 한다.
    let id = req.body.id;
    let passwd = req.body.passwd;
    // console.log({id, passwd});
    // console.log(req.body);
    // 로그인 처리 후 index.html페이지로 이동
    res.redirect("/");
});

// router로 REST 방식의 요청 처리 테스트
// get() = select, post() = insert, put() = update, delete() = delete
router.route("/board").get((req, res) => {
    console.log("GET - /board");
    res.redirect("/");
});
router.route("/board/:user/:job").post((req, res) => {
    console.log("POST - /board/:user/:job");
    console.log(req.params);
    console.log(req.params.user, req.params.job);
    let paramObj = req.params;
    res.redirect({ paramObj }); // JSON
});
router.route("/board").put((req, res) => {
    console.log("PUT - /board");
    let data = req.body;
    res.send({ data });
});
router.route("/board").delete((req, res) => {
    console.log("DELETE - /board");
    let data = req.body;
    res.send({ data });
});

// 2) router 미들웨어 설정
app.use("/", router);

// ERROR 페이지 설정 - router 미들웨어 설정 아래에 위치해야 함.
/*
app.all("*", (req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf8"});
    res.status(400).end("<h1>ERROR! 존재하지 않는 페이지입니다.</h1>");
    // res.status(404).redirect("/404.html");
});
*/

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