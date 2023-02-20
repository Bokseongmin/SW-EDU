const http = require('http');
const express = require('express');
const app = express();

const router = express.Router();

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

process.env.PORT = 3001;
app.set('port', 3001);

app.get('/home', (req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf8" });
    res.write("<h1>길동이의 홈페이지</h1>");
    res.end();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const carList = [
    { no: 1, company: "HYUNDAI", title: "SONATA", year: 2022, price: 3000, state: "대기중" },
    { no: 2, company: "HYUNDAI", title: "GRANDEUR", year: 2019, price: 4000, state: "대기중" },
    { no: 3, company: "KIA", title: "K9", year: 2020, price: 7000, state: "대기중" }
];

let seqCar = 4;

router.route("/car").get((req, res) => {
    console.log("GET - /car");
    req.app.render("car", { carList }, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        res.end(data);
    });
});

router.route("/car").post((req, res) => {
    console.log("POST - /car");
    res.redirect("/car");
});

router.route("/car/buy").get((req, res) => {
    console.log("GET - /car/buy");
    let no = req.query.no;

    let index = carList.findIndex((item, i) => {
        return item.no == no;
    });
    if (index != -1) {
        carList[index].state = "예약중";
    }
    res.redirect("/car");
});

app.get("/admin", (req, res) => {
    console.log("GET - /admin");
    req.app.render("admin", { carList }, (err, data) => {
        if (err) throw err;
        res.end(data);
    });
});

app.post("/admin", (req, res) => {
    console.log("POST - /admin");

    var getCompany = req.body.company;
    var getTitle = req.body.title;
    var getYear = req.body.year;
    var getPrice = req.body.price;
    var getState = "대기중";

    carList.push({ no: seqCar++, company: getCompany, title: getTitle, year: getYear, price: getPrice, state: getState });

    res.redirect("/admin");
});

app.get("/admin/state", (req, res) => {
    console.log("GET - /admin/state");
    let no = req.query.no;
    let state = req.query.state;

    let index = carList.findIndex((item, i) => {
        return item.no == no;
    });
    if (index != -1) {
        carList[index].state = state;
    }
    res.redirect("/admin");
});

app.get("/admin/modify", (req, res) => {
    console.log("GET - /admin/modify >>> " + req.query.no);
    let no = req.query.no;
    let company = req.query.company
    let title = req.query.title;
    let year = req.query.year;
    let price = req.query.price;

    let index = carList.findIndex((item, i) => {
        return item.no == no;
    });

    if (index != -1) {
        carList[index].company = company;
        carList[index].title = title;
        carList[index].year = year;
        carList[index].price = price;
    }
    res.redirect("/admin");
});

app.get("/admin/delete", (req, res) => {
    console.log("GET - /admin/delete");
    let no = req.query.no;

    let index = carList.findIndex((item, i) => {
        return item.no == no;
    });
    if (index != -1) {
        carList.splice(index, 1);
    }
    res.redirect("/admin");
});

app.use("/", router);

/////// error handler -----
var expressErrorHandler = require('express-error-handler');
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