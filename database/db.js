const { use } = require("express/lib/application");
const spicedPg = require("spiced-pg");

const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:postgres:postgres@localhost:5432/imageboard`
);

// ========== QUERIES ========== //

module.exports.getImages = () => {
    return db.query(`
    SELECT * FROM images
    ORDER BY id DESC
    `);
};

module.exports.getModalImg = (imgId) => {
    return db.query(
        `SELECT * FROM images WHERE id = $1`, 
        [imgId]);
};

module.exports.addImage = (title, description, username, url) => {
    return db.query(
        `INSERT INTO images (title, description, username, url) 
        VALUES ($1, $2, $3, $4) 
        RETURNING *`,
        [title, description, username, url]
    );
};

module.exports.deleteImg = (imgId) => {
    return db.query(
        `DELETE FROM images WHERE id = $1`,
        [imgId]
    );
};
