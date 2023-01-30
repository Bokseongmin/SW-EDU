var http = require('http');

const server = http.createServer(function(req, res) {
    res.end("<h1>Hello Nodejs world</h1>");
});

server.listen(3000, function() {
    console.log("node js 서버 실행 중...");
});

/*console.log("Hello node.js World!");
for(var i=0; i<10; i++) {
    console.log(i);
}
*/
// 한 줄 주석
/*
여러 줄 주석
문법은 ES6+문법 + 기존 자바스크립트 문법
*/