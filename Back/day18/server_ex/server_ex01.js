/*
    BodyParser
*/

const http = require('http');
const express = require('express');
const app = express();

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

process.env.PORT = 3000;
app.set('port', 3000);

// bodyParser 미들웨어 설정 부분
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// static 미들웨어 설정 - express 내장
app.use(express.static(__dirname + "/public"));

app.get('/home', (req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf8" });
    res.write("<h1>길동이의 홈페이지</h1>");
    res.end();
});

// 로그인 처리
app.post('/login', (req, res) => {
    // post 방식의 요청 시에는 body에 피라미터가 담겨서 전달된다.
    // bodyParser미들웨어가 설정 되어야 한다.
    let id = req.body.id;
    let passwd = req.body.passwd;
    // console.log({id, passwd});
    // console.log(req.body);
    // 로그인 처리 후 index.html페이지로 이동
    res.redirect("/");
});

const server = http.createServer(app);
server.listen(app.get('port'), () => {
    console.log("Node.js 서버 실행 중 ... http://localhost:" + app.get('port'));
});