const express = require('express');
const app = express(); // creating an instance of express

const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");

const diskStorage = multer.diskStorage({
    destination: function (req,file,callback){
        callback(null,path.join( __dirname, "uploads"));
    },
    filename: function (req,file,callback){
        uidSafe(24).then((uid) => {     // will rename the file with an exclusive name with 24char
            callback(null,uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits:{
        fileSize: 2097152,
    },
});


//----- This is case we dont use a form -- using formData API instead
//////////////////////////////////////
// const file = myFileInput.files[0];

// const formData = new formData();
// formData.append("file", file);

// fetch("/upload.json", {
//     method: "POST",
//     body: formData,
// });
/////////////////////////////////////



app.use(express.static('./public'));

app.use(express.json()); // helps us parse things from incoming requests that ate content-type application/json

app.post("/upload", uploader.single("file"), (req,res) => {
    console.log("/upload got hit");
    console.log("req.file", req.file);
});

app.get('*', (req, res) => {// star route is the only route that will serve stuff in our project
    res.sendFile(`${__dirname}/index.html`);
});

app.listen(8080, () => console.log(`I'm listening -->> http://localhost:8080`));