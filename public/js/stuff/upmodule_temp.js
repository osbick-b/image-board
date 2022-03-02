const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");

const diskStorage = multer.diskStorage({
    destination: function(req,file,callback) {
        callback(null,path.join(__dirname, "uploads"));
    },
    filename: function(req,file,callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

const file = myFileInput.files[0];

const formData = new formData();
formData.append('file', file);

fetch("/upload.json", {
    method: "POST",
    body: formData
});



app.post("/upload", uploader.single("file"), function(req,res) {
    if (req.file){
        res.json({success:true});
    } else {
        res.json({success:false});
    }
});