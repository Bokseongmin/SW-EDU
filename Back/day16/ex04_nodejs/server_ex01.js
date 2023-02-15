const http = require("http");

const server = http.createServer((req, res) => {
    res.writeHead(200, {"Content-Type" : "text/html; charset=UTF-8"});
    if(req.url === "/profile") {
        res.write("<h2>길동이의 프로필</h2>");
        res.write("<a href='/'>홈</a>")
    }
    if(req.url === "/") {
        res.write("<h2>길동이의 홈페이지</h2>");
        res.write("<a href='/profile'>프로필</a>")
    }
    res.end();
});

server.listen(3000, ()=> {
    console.log("서버 실행 중...");
});