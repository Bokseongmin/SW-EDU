const express = require('express');
const app = express();

// app.get(path, callback);
app.get('/', (req, res) => {
    res.end("<h1>Home page</h1>");
});

// node index.js로 싱행시 소스 수정 후 재실행 하여야 적용된다.
// nodemon 모듈을 설치하고 nodemon으로 실행 시 자동으로 수정 후 재실행 함.
app.listen(3000, ()=> {
    console.log("서버 실행 중 ...");
});