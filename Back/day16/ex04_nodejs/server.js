const http = require("http");
const fs = require("fs");

const server = http.createServer();
server.listen(3000, ()=> {
    console.log("서버 실행 중...");
});

server.on("request", (req, res) => {
    if(req.url === "/") {
        res.writeHead(200, {"Content-Type" : "text/html; charset=UTF-8"});
        res.write("<h1>길동이의 홈페이지</h1>");
        res.end(); // 없으면 무한 루프
    }
    if(req.url === "/img") {
        let filename = "./public/3.png";
        fs.readFile(filename, function(err, data) {
            if(err) throw err;
            res.writeHead(200, {"Content-Type" : "image/png"});
            res.write(data);
            res.end();
        });
    }
});