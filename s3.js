const aws = require("aws-sdk");
const fs = require("fs");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env;
} else {
    secrets = require("./secrets");
}

const s3 = new aws.S3({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
});

// ----- Fns ------ //
exports.upload = (req, res, next) => {
    if (!req.file) {
        console.log("Multer failed!");
        return res.sendStatus(500);
    }

    const { filename, mimetype, size, path } = req.file;
    
    s3.putObject({
        Bucket: "spicedling",
        ACL: "public-read",
        Key: filename,
        Body: fs.createReadStream(path),
        ContentType: mimetype,
        ContentLength: size
    })
        .promise()
        .then(() => {
            next();
        })
        .catch((err) => {
            console.log("error in s3.js -- putObject", err);
            return res.sendStatus(500);
        });
};