const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
// npm i -S formidable
const formidable = require('formidable');
const fs = require("fs");
const util = require('util');

// app.set("key", "value")  - setAttribute 용도로 사용
// app.get("key");  - getAttribute의 용도로 사용
// app.get("path", 콜백함수)  - 서버의 doGet 역할
// app.post("path", 콜백함수)  - 서버의 doPost 역할
app.set("port", 3000);

app.set("view engine", "ejs");
app.set("views", __dirname + "/template");

app.use(cors());
app.use(express.static(__dirname + "/public"));


app.get("/", (req, res)=>{
    res.writeHead(200, {"Content-Type":"text/html; charset=UTF-8"});
    res.write("<h1>Hello world</h1>");
    res.end();
});

app.post("/saram/input", (req, res)=>{
    var form = new formidable.IncomingForm();
    console.log(form.multiples);
    form.multiples = true;

    form.parse(req, function(err, fields, files) {
        res.writeHead(200, {'content-type': 'text/plain'});
        res.write('received upload:\n\n');
        //res.end(util.inspect({fields: fields, files: files}));
        res.end();
    });

    form.on('end', function(fields, files) {
        // console.log(this.openedFiles);
        console.log(" 총 업로드 파일 갯수 == ", this.openedFiles.length);
        //console.dir(this.openedFiles);
        for(var i = 0; i < this.openedFiles.length; i++) {
            /* Temporary location of our uploaded file */
            // 맥에서는 temp_path 가 폴더가 아니라, 업로드한 파일임.
            var temp_path = this.openedFiles[i].filepath;
            /* The file name of the uploaded file */
            var file_name = this.openedFiles[i].originalFilename;

            /* Location where we want to copy the uploaded file */
            var new_location = 'C:/Users/User/upload/';

            console.log("temp_path == ", temp_path);
            console.log("file_name == ", file_name);
           // console.log(this.openedFiles[i]);

            // temp_path 로 받은 파일을, 원래 이름으로 변경하여 이동시킨다.
            fs.rename(temp_path, new_location + file_name, function (err) {
                if (err) {
                    console.log("file system error : rename error!")
                    //console.error(err);
                } else {
                    console.log("success!")
                }
            });
        }
    });
});


// http와 express의 결합 - 같은 port를 공유한다.
const server = http.createServer(app);
server.listen(app.get("port"), ()=>{
    console.log("서버 실행 중 - http://localhost:"+ app.get("port") );
});
