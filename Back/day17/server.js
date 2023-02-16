const http = require('http');
const express = require('express');
const app = express();

// view engin - 템플릿엔진
app.set("views", __dirname + "/views"); // prefix
// app.set("views", "./views"); 상대경로
app.set("view engine", "ejs"); // suffix

process.env.PORT = 3000;
app.set('port', 3000);
// console.log(process.env.PORT ? process.env.PORT : 3000)
console.log(process.env.PORT || 3001); // 3항 연산자의 줄임 표현

// bodyParser 미들웨어 설정 - express의 설정으로 변경
// POST 요청 방식에서 body의 피라미터 사용 가능.
app.use(express.json()); // application/json
app.use(express.urlencoded({ extended: true }));// application/x-www-form-urlencoded 

//static 미들웨어 설정 - express에 내장
app.use(express.static(__dirname + "/public"));

const todoList = [
    { idx: 1, title: "hello", done: false },
    { idx: 2, title: "world", done: false },
    { idx: 3, title: "node 공부", done: false }
];
let seqTodoList = 4;

// 특정 패스 요청 처리 app.get()
app.get('/home', (req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf8" });
    res.write("<h1>길동이의 홈페이지</h1>");
    res.end(); // end() 안하면 무한루프 발생.
});

// GET 요청 방식에서 처리
app.get("/todoList", (req, res) => {
    req.app.render("todoList", { todoList }, (err, data) => {
        if (err) throw err;
        res.end(data);
    });
});

// POST 요청일 때 처리
app.post("/todoList", (req, res) => {
    console.log("POST - /todoList");
    // post방식에서 피라미터 받기 - bodyParser미들웨어 사용
    // express.json(), express.urlencoded() 미들위어로 설정
    var newItem = req.body.newItem;
    todoList.push({ idx: seqTodoList++, title: newItem, done: false });
    // 저장 후 목록 갱신...
    res.redirect("/todoList");
});

app.get("/todoList/update", (req, res) => {
    console.log("GET - /todoList/update >>> " + req.query.idx);
    let idx = req.query.idx;
    let title = req.query.title;

    // index를 찾는다.
    // 해당 요소의 title을 변경.
    let index = todoList.findIndex((item, i) => {
        return item.idx == idx;
    });
    // 유효성 체크
    if (index != -1) {
        todoList[index].title = title;
    }
    res.redirect("/todoList");
});

app.get("/todoList/delete", (req, res) => {
    console.log("GET - /todoList/delete >>> " + req.query.idx);
    let idx = req.query.idx;

    let index = todoList.findIndex((item, i)=>{
        return item.idx == idx;
    })
    if(index != -1) {
        todoList.splice(index, 1);
    }
    res.redirect("/todoList");
});

app.get("/json/todoList", (req, res) => {
    // res.end() - 문자열 인자만 처리
    // res.send() - 수식 or 객체만 처리
    res.send({ todoList });
});

// http와 express를 합쳐준다. - 같은 port 사용.
const server = http.createServer(app);
server.listen(app.get('port'), () => {
    console.log("Node.js 서버 실행 중 ... http://localhost:" + app.get('port'));
})