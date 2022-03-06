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
    db.getImages().then(({ rows }) => {
        res.json(rows);
    });
});

//---- GET /images/MORE
app.get("/images/more/:lastLoadedId", (req, res) => {
    console.log(
        "on GET/moreImages -- req.params.lastLoadedId",
        req.params.lastLoadedId
    );
    db.getMoreImages(req.params.lastLoadedId).then(({ rows }) => {
        console.log("rows", rows);
        res.json(rows);
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
        // .catch((err) => {
        //     console.log("error in addImage /upload", err);
        //     res.sendStatus(500);
        // });
});

// ---- GET evalUrl
app.get("/evalUrl/:customUrl", (req,res) => {
    console.log(
        "in server.js -- evalUrl: req.params.url",
        req.params.customUrl
    );
    db.evalUrl(req.params.customUrl).then(({ rows }) => {
        console.log("in server.js -- FROM DB evalUrl: rows", rows);
        return res.json(rows[0]?rows[0]:"salgadinho");
    })
    // .catch((err) => {
    //     console.log("error in server.js -- /GET evalUrl", err);
    // });
});


//---- GET img modal/:id ---- img for modal
app.get("/images/:id", (req, res) => {
    db.getImg(req.params.id)
    .then(({ rows }) => {
        res.json(rows[0]);
    })
    // .catch((err) => {
        //     console.log("error in server.js -- db.getImg", err);
        // });
    });
    

//---- GET comments ---- comments for modal
app.get("/images/:id/comments", (req, res) => {
    db.getComments(req.params.id)
    .then(({ rows }) => {
            console.log("SERVER --- resp from getComments: rows", rows); //// OK UNTIL HERE
            res.json(rows);
        })
        // .catch((err) => {
        //     console.log("error in server.js -- db.getImg", err);
        // });
});


//---- POST comment
app.post("/images/:id/comment", (req, res) => {
    db.postComment(req.params.id, req.body.username, req.body.comment)
    .then(({ rows }) => {
        console.log("rows from postComment", rows);
        return res.json(rows);
    })
        // .catch((err) => {
        //     console.log("error in server.js -- /POST comment", err);
        // });
});


//---- POST --- modal deleteImg
app.post("/images/:id/delete", (req, res) => {
    db.deleteImg(req.body.imgId)
        .then(() => {
            return db.getImagesAllSoFar(req.body.lastLoadedId);
        })
        .then(({ rows }) => {
            res.json(rows);
        })
        // .catch((err) => {
        //     console.log("error in server.js -- db.deleteImg", err);
        // });
});

//---- GET *
app.get("*", (req, res) => {
    // star route is the only route that will serve stuff in our project
    console.log("-- IN STAR ROUTE");
    res.sendFile(`${__dirname}/index.html`);
});

// ================ Listener ================ //

app.listen(8080, () => console.log(`I'm listening -->> http://localhost:8080`));



