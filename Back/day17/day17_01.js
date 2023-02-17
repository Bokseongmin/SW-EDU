const http = require('http');
const express = require('express');
const app = express();

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

process.env.PORT = 3000;
app.set('port', 3000);
console.log(process.env.PORT || 3001);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

const todoList = [
    { idx: 1, title: "hello", done: false },
    { idx: 2, title: "world", done: false },
    { idx: 3, title: "node 공부", done: false }
];
let seqTodoList = 4;

app.get('/home', (req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf8" });
    res.write("<h1>길동이의 홈페이지</h1>");
    res.end();
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

    var newItem = req.body.newItem;
    todoList.push({ idx: seqTodoList++, title: newItem, done: false });

    res.redirect("/todoList");
});

// 취소선
app.get("/todoList/chk", (req, res)=> {
    let idx = req.query.idx;
    let index = todoList.findIndex((item, i) => {
        return item.idx == idx;
    });
    if (index != -1) {
        todoList[index].done = !todoList[index].done;
        console.log(todoList[index].done);
    }
    res.redirect("/todoList");
});

// 수정
app.get("/todoList/update", (req, res) => {
    console.log("GET - /todoList/update >>> " + req.query.idx);
    let idx = req.query.idx;
    let title = req.query.title;

    let index = todoList.findIndex((item, i) => {
        return item.idx == idx;
    });

    if (index != -1) {
        todoList[index].title = title;
    }
    res.redirect("/todoList");
});

// 삭제
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
    res.send({ todoList });
});

const server = http.createServer(app);
server.listen(app.get('port'), () => {
    console.log("Node.js 서버 실행 중 ... http://localhost:" + app.get('port'));
})