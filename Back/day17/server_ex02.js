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

// 특정 패스 요청 처리 app.get()
app.get('/home', (req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf8" });
    res.write("<h1>길동이의 홈페이지</h1>");
    res.end(); // end() 안하면 무한루프 발생.
});

// bodyParser 미들웨어 설정 - express의 설정으로 변경
// POST 요청 방식에서 body의 피라미터 사용 가능.
app.use(express.json()); // application/json
app.use(express.urlencoded({ extended: true }));// application/x-www-form-urlencoded 

const carList = [
    { no: 1, title: "SONATA", price: 3000, company: "HYUNDAI", year: 2022 },
    { no: 2, title: "GRANDEUR", price: 4000, company: "HYUNDAI", year: 2019 },
    { no: 3, title: "K9", price: 7000, company: "KIA", year: 2020 }
];

// ejs 템플릿 뷰 엔진 사용
app.get("/car", (req, res) => {
    let userName = "홍길동";
    // req.app.render(뷰파일, data, 콜백함수(err, data){});
    req.app.render("car", { userName, carList }, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        res.end(data);
    });
});

// http와 express를 합쳐준다. - 같은 port 사용.
const server = http.createServer(app);
server.listen(app.get('port'), () => {
    console.log("Node.js 서버 실행 중 ... http://localhost:" + app.get('port'));
})