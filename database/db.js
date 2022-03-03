const { use } = require("express/lib/application");
const spicedPg = require("spiced-pg");

const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:postgres:postgres@localhost:5432/imageboard`
);

// ========== QUERIES ========== //

module.exports.getImages = () => {
    // the very 1st load. retrieves from the end of DB
    return db.query(
        `SELECT *, 
            (SELECT id FROM images
            ORDER BY id ASC
            LIMIT 1) AS "finalImgId" 
        FROM images
        ORDER BY id DESC
        LIMIT 4`
    );
};

module.exports.getMoreImages = (lastLoadedId) => {
    return db.query(
        `SELECT *, 
            (SELECT id FROM images
            ORDER BY id ASC
            LIMIT 1) AS "finalImgId" 
        FROM images 
        WHERE id < $1
        ORDER BY id DESC
        LIMIT 4`,
        [lastLoadedId]
    );
};

// --- +++ --- query to get all imgs loaded so far fot case of deleting img
module.exports.getImagesAllSoFar = (lastLoadedId) => {
    return db.query(
        `SELECT *, 
            (SELECT id FROM images
            ORDER BY id ASC
            LIMIT 1) AS "finalImgId" 
        FROM images
        WHERE id >= $1
        ORDER BY id DESC`,
        [lastLoadedId]
    );
};

module.exports.getModalData = (imgId) => {
    return db.query(
        `SELECT images.* , comments.username AS "commUser", comments.comment, comments.created_at AS "commTimestamp"
    FROM images 
    LEFT JOIN comments
    ON images.id = comments.img_id
    WHERE images.id = $1
    ORDER BY id DESC`,
        [imgId]
    );
};

module.exports.postComment = (imgId, username, comment) => {
    return db.query(
        `INSERT INTO comments (img_id, username, comment) 
        VALUES ($1, $2, $3)
        RETURNING *`,
         [imgId, username, comment]
    );
};

// module.exports.getImgComments = (imgId) => {
//     return db.query(
//         `SELECT comments.username AS "commUser", comments.comment, comments.img_id comments.created_at AS "commTimestamp"
//         FROM comments
//         WHERE img_id = $1
//         ORDER BY id DESC`,
//         [imgId]
//     );
// };

module.exports.addImage = (title, description, username, url) => {
    return db.query(
        `INSERT INTO images (title, description, username, url) 
        VALUES ($1, $2, $3, $4) 
        RETURNING *`,
        [title, description, username, url]
    );
};

module.exports.deleteImg = (imgId) => {
    // console.log("DB -- deleteImg");
    return db.query(`DELETE FROM images WHERE id = $1`, [imgId]);
};
