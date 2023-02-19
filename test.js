router.route("/fileupload").post((req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var oldpath = files.filetoupload.filepath;
        var newpath = __dirname + "/upload/" + files.filetoupload.originalFilename;
        fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;
            res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
            res.write("<h3>File uploaded and moved!</h3>");
            res.write(`<img src="/upload/${files.filetoupload.originalFilename}"/>`);
            res.end();
        });
    });
})