const { use } = require("express/lib/application");
const spicedPg = require("spiced-pg");

const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:postgres:postgres@localhost:5432/imageboard`
);

// ========== QUERIES ========== //

module.exports.getImages = () => {
    return db.query(`SELECT * FROM images`);
};

module.exports.addImages = (title, description, username, url) => {
    console.log("-- in db addImages");
    return db.query(
        `INSERT INTO images (title, description, username, url) VALUES ($1, $2, $3, $4)`,
        [title, description, username, url]
    );
};
