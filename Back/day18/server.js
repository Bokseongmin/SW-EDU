const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const router = express.Router();
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");

const formidable = require("formidable");
const fs = require("fs");

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
process.env.PORT = 3000;
app.set("port", process.env.PORT || 3001);

app.use(cookieParser());
app.use(expressSession({
    secret: 'my key',
    resave: true,
    saveUninitialized: true
}));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/public"));


/////// router -------
router.route("/home").get((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf8" });
    res.write("<h1>길동이의 홈페이지</h1>");
    res.end();
});

const boardList = [];

router.route("/board").get((req, res) => {
    console.log("GET - /board");
    req.app.render("board", { boardList }, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        res.end(data);
    });
});

let seqList = 1;
router.post("/board", (req, res) => {
    console.log("POST - /board");
    const form = new formidable.IncomingForm();
    form.uploadDir = "E:\\";
    form.parse(req, function (err, fields, files) {
        if (err) throw err;
        const oldpath = files.pic.filepath;
        const newpath = __dirname + "/public/upload/" + files.pic.originalFilename;
        fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;
            boardList.push({
                no: seqList++,
                id: fields.id,
                name: fields.name,
                email: fields.email,
                pic: `/upload/${files.pic.originalFilename}`
            })
            console.log(boardList);
            res.redirect("/board");
        });
    });
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
server.listen(app.get("port"), () => {
    console.log("Node.js 서버 실행 중 ... http://localhost:" + app.get("port"));
});