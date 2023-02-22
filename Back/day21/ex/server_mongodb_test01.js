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
async function connectDB() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Establish and verify connection
    db = client.db("vehicle");
    console.log("Connected successfully to server");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}

router.route("/test").get( async (req, res)=>{
    console.log("GET - /test 요청 됨.");
    res.writeHead(200, {"Content-Type":"text/html; charset=utf8"});
    res.write("<h1>Test page!</h1>");
    if(db) {
        const car = db.collection("car");
        car.findOne({}, function(findErr, carData) {
            if(findErr) throw err;
            console.log(carData);
            res.write("<h3>car info</h3>");
            res.write(JSON.stringify(carData) );
            res.end();
        });
        console.log("출력 완료 !");
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