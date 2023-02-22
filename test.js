router.route("/").get((req, res) => {
    const name = req.session.user;
    let mainData = {};
    if (db) {
        const car = db.collection("car");
        car.find({}).toArray(function (findErr, carList) {
            if (findErr) throw err;
            mainData = { carList: carList, name: name };
            req.app.render("main", mainData, function (err, data) {
                if (err) {
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                } else {
                    res.end(data);
                }
            });
        });
        console.log("출력 완료 !");
    } else {
        mainData = { name: name };
        res.render("main", mainData);
    }
});

router.route("/").get((req, res) => {
    const name = req.session.user;
    if (name) {
        res.render("main", { name });
    } else {
        res.render("main", { name });
    }
    if (db) {
        const car = db.collection("car");
        car.find({}).toArray(function (findErr, carList) {
            if (findErr) throw err;
            req.app.render("main", { carList }, function (err, data) {
                res.end(data);
            });
        });
        console.log("출력 완료 !");
    }
});