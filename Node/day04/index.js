const express = require('express');
const app = express();

// app.get(path, callback);
app.get('/', (req, res) => {
    res.end("<h1>Home page</h1>");
});

app.get('/profile', (req, res) => {
    res.writeHead(200, {"Content-Type":"text/html; charset=utf-8"});
    res.end("<h1>프로필 페이지</h1>");
});

app.get("/car", (req, res)=> {
    // 쿼리스트링으로 전달된 파라미터 받아오기.
    let name = req.query.name;
    let year = req.query.year;
    console.log(name, year);

    res.writeHead(200, {"Content-Type":"text/html; charset=utf-8"});
    res.end("<h1>자동차 목록 페이지</h1>");
});

// node index.js로 실행하면 소스 수정 후 재실행 해야 적용된다.
// nodemon 모듈을 설치하고 nodemon으로 실행 하면 수정 후 바로 적용 됨.
app.listen(3000, ()=>{
    console.log("서버 실행 중 ...");
});