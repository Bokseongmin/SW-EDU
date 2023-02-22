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
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

app.use(cookieParser());
app.use(session({
    secret:'my key',
    resave:true,
    saveUninitialized:true
}));

const uri = "mongodb://127.0.0.1";
const client = new MongoClient(uri, { useUnifiedTopology: true });
let db = null;
let localDB = null;
async function connectDB() {
  try {
    await client.connect();
    db = client.db("vehicle");
    localDB = client.db("local");
    console.log("Connected successfully to server");
  } finally {
  }
}

///////--------------------------------
router.route("/login").post((req, res)=>{
    console.log("POST - /login");
    res.writeHead(200, {"Content-Type":"text/html; charset=utf8"});
    
    res.write("<h1>Login Process!</h1>");
    const userId = req.body.id;
    const passwd = req.body.passwd;
    if(localDB) {
        let users = localDB.collection("users").findOne({id: userId, passwd: passwd}, function (err, result) {
            if(err) throw err;
            console.log(result.id, result.name);
            console.log("일치");
            res.end("일치");
            
        });
    } else {
        console.log("localDB가 없습니다.");
    }
});

router.route("/test/car/list").get( async (req, res)=>{
    console.log("GET - /test/car/list 요청 됨.");
    res.writeHead(200, {"Content-Type":"text/html; charset=utf8"});
    res.write("<h1>Test page!</h1>");

    if(db) {
        const car = db.collection("car");
        car.find({}).toArray(function(findErr, carList) {
            if(findErr) throw err;
            req.app.render("car/list", {carList}, function(err, html) {
                res.end(html);
            });
        });
        console.log("출력 완료 !");
    }
});

app.use("/", router);
server.listen(app.get("port"), ()=>{
    console.log("http://localhost:"+ app.get("port"));
    console.log("Node.js 서버 실행 중 ...");
    connectDB().catch(console.dir);
});