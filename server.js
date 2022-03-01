const express = require('express');
const app = express(); // creating an instance of express

const db = require("./database/db");


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
app.use(express.static('./public'));
app.use(express.static('./uploads'));

app.use(express.json()); // helps us parse things from incoming requests that ate content-type application/json


app.use((req, res, next) => {
    if (req.url !== "/favicon.ico") {
        console.log(`${req.method}  ${req.url}\t`);
        next();
    }
});

// ================ ROUTES ================ //

//---- GET /images.json
app.get("/images.json", (req,res) => {
    db.getImages().then(
        (results) => {
            // console.log("results", results);
            res.json(results.rows);
        }
    );
    // 1st talk to database, find out all the image data we have 
    // pass array to res.json to send info back to client
});

//----- POST /upload
app.post("/upload.json", uploader.single("file"), function (req, res) {
    console.log(">>> upload was hit");
    console.log("req.file", req.file);
    console.log("req.body", req.body);

    // THIS HAS TO BE CHANGED BASED ON DAVIDS CLASS --->
    if (req.file) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

//---- GET *
app.get('*', (req, res) => {// star route is the only route that will serve stuff in our project
    console.log("-- IN STAR ROUTE");
    res.sendFile(`${__dirname}/index.html`);
});

// ================ Listener ================ //

app.listen(8080, () => console.log(`I'm listening -->> http://localhost:8080`));