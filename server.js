const express = require("express");
const app = express(); // creating an instance of express

const db = require("./database/db");
const s3 = require("./s3");

const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, "uploads"));
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});

// ================ Middleware ================ //
app.use(express.static("./public"));
app.use(express.static("./uploads"));

app.use(express.json()); // helps us parse things from incoming requests that ate content-type application/json

app.use((req, res, next) => {
    if (req.url !== "/favicon.ico") {
        console.log(`${req.method}  ${req.url}\t`);
        next();
    }
});

// ================ ROUTES ================ //

//---- GET /images.json
app.get("/images.json", (req, res) => {
    db.getImages().then((rows) => {
        res.json(rows.rows);
    });
});

//----- POST /upload
app.post("/upload.json", uploader.single("file"), s3.upload, (req, res) => {
    db.addImage(
        req.body.title,
        req.body.description,
        req.body.username,
        `https://s3.amazonaws.com/spicedling/${req.file.filename}`
    )
        .then(({ rows }) => {
            res.json(rows[0]);
        })
        .catch((err) => {
            console.log("error in addImage /upload", err);
            res.sendStatus(500);
        });
});

//---- GET modal/:id ---- for modal
app.get("/images/:id", (req, res) => {
    db.getModalImg(req.params.id)
        .then(({ rows }) => {
            res.json(rows[0]);
        })
        .catch((err) => {
            console.log("error in server.js -- db.getModalImg", err);
        });
});

//---- GET --- modal deleteImg
app.get("/images/:id/delete", (req, res) => {
    db.deleteImg(req.params.id)
        .then(() => {
            console.log("req.params.id", req.params.id);
            res.send(req.params.id);
        })
        .catch((err) => {
            console.log("error in server.js -- db.getModalImg", err);
        });
});

//---- GET *
app.get("*", (req, res) => {
    // star route is the only route that will serve stuff in our project
    console.log("-- IN STAR ROUTE");
    res.sendFile(`${__dirname}/index.html`);
});

// ================ Listener ================ //

app.listen(8080, () => console.log(`I'm listening -->> http://localhost:8080`));
