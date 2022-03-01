const aws = require("aws-sdk");

let secrets;
if (process.env.NODE_ENV == "production"){
    secrets = process.env;
} else {
    secrets = require("./secrets");
}

const s3= new aws.S3({
    accessKeyId:secrets.AWS_KEY,
    accessKeySecret:secrets.AWS_SECRET
});

exports.upload = (req, res, next) => {
    if (!req.file) {
        console.log("Multer failed!");
        return res.sendStatus(500);
    }

    const { filename, mimetype, size, path }= req.file;

    s3.putObject({}).then().catch((err) => {
        console.log("error in putObject", err);
    });
};

app.listen( 8080, () => console.log(`I'm listening -->> http://localhost:8080`));





