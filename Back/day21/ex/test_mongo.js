// mongojs 모듈을 이용한 mongodb 연동
const mongojs = require("mongojs");

const db = mongojs("vehicle", ['car']);

db.car.find((err, data) => {
    console.log("car list");
    console.log(data);
});

db.close();