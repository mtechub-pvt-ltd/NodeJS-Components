var express = require("express")
var app = express();

app.use(require("./front"))  // any file

const multer = require("multer")
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/')
    },
    filename: function (req, file, cb) {
        cb(null, 'image-' + Date.now() + file.originalname)
    }
})
const upload = multer({
    storage: storage,
});

app.get("/", upload.single("image") , (req, res) => {
    res.send("Hello world")
})

var server = app.listen(5000, (req, res) => {
    console.log("Connected to port no 6000")
})