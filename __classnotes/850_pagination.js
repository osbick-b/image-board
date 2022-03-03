// pagination -- fething content by parts i think

// -- db.query
SELECT * FROM images
ORDER BY id DESC
LIMIT 10;

// once you do this, you can add a more button (or infinite scroll)
//then make ajax request
// then add the next set of imgs to the already existing array (push)

// many approaches to get next set of data

// ====== The Offset Approach ====== //
// OFFSET == skip

...  WHERE id < biggestId
LIMIT 3 // get 3 images
OFFSET 3; // get images from end but skip 3

// the next time... OFFSET 6 ... OFFSET 9 usw

// -- the problem is: it doesnt support image deletion, 
// case let's say someone else deletes an image from the db, and it won't yet be deleted (visually)
// for you bc you didnt refresh




// ====== The Lowest Id Approach ====== //

// you'll store the id of last retrieved img and request db from there

`... WHERE ID < $1 
ORDER BY DESC
LIMIT 10`,
[lastId]

// if theres nothing more to load: REMOVE more button
// for that you need another small SUBquery on the side, to get the very lowest id on the db

SELECT url, title, id, (
    SELECT id FROM images 
    ORDER BY id ASC // ---> subquery --> gets the LOWEST id in db: that is, the oldest and last img
    LIMIT 1 // -- getting 1 value: the 1st
) AS "lowestId" FROM images
WHERE id < $1
ORDER BY id DESC
LIMIT 10;


// SUBQUERIES 
// --- ASC = the very lowest (last/oldest img)
    SELECT id FROM images 
    ORDER BY id ASC
    LIMIT 1

// --- DESC = the very highest (first/most recent img)
    SELECT id FROM images 
    ORDER BY id DESC
    LIMIT 1



// SELECT *, (SELECT id FROM images
// ORDER BY id ASC
// LIMIT 1) AS "finalImgId" FROM images
// ORDER BY id DESC
// LIMIT 4