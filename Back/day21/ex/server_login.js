const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const router = express.Router();
const { MongoClient } = require('mongodb');
const session = require("express-session");
const cookieParser = require("cookie-parser");

app.set("port", process.env.PORT || 3000);
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.use(cookieParser());
app.use(session({
    secret: 'my key',
    resave: true,
    saveUninitialized: true
}));

const uri = "mongodb://127.0.0.1";
const client = new MongoClient(uri, { useUnifiedTopology: true });
let db = null;
let localDB = null;
async function connectDB() {
    try {
        // Connect the client to the server (optional starting in v4.7)
        await client.connect();
        // Establish and verify connection
        db = await client.db("vehicle");
        localDB = await client.db("local");
        console.log("Connected successfully to server");
    } finally {
        // Ensures that the client will close when you finish/error
        //await client.close();
    }
}

///////--------------------------------
router.route("/login").post((req, res) => {
    console.log("POST - /login");
    const userId = req.body.id;
    const passwd = req.body.passwd;
    if (localDB) {
        let users = localDB.collection("users").findOne({ id: userId, passwd: passwd }, function (err, result) {
            if (err) throw err;
            if (result) {
                // session에 정보를 저장 하고 이동...
                req.session.user = {
                    id: userId,
                    name: result.name
                }
                res.redirect("/product");
            } else {
                console.log("불일치한다.");
                res.redirect("/login.html");
            }
        });
    } else {
        console.log("localDB 없습니다.")
    }
});

router.route("/logout").get(async (req, res) => {
    req.session.user = null;
    res.redirect('/login.html');
});

router.route("/product").get(async (req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf8" });
    res.write("<h1>product page!</h1>");
    if (req.session.user) {
        res.write("Hi : " + req.session.user.name + " login!");
        res.write("<p><a href='/logout'>Logout</a></p>");
        res.end();
    } else {
        res.redirect("/login.html");
    }
});

router.route("/test/car/list").get(async (req, res) => {
    console.log("GET - /test/car/list 요청 됨.");
    res.writeHead(200, { "Content-Type": "text/html; charset=utf8" });
    res.write("<h1>Test page!</h1>");

    if (db) {
        const car = db.collection("car");
        car.find({}).toArray(function (findErr, carList) {
            if (findErr) throw err;
            req.app.render("car/list", { carList }, function (err, html) {
                res.end(html);
            });
        });
        console.log("출력 완료 !");
    }
});

app.use("/", router);
server.listen(app.get("port"), () => {
    console.log("http://localhost:" + app.get("port"));
    console.log("Node.js 서버 실행 중 ...");
    connectDB().catch(console.dir);
});