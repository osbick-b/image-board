const express = require('express');
const app = express(); // creating an instance of express

const db = require("./database/db");


// ================ Middleware ================ //
app.use(express.static('./public'));

app.use(express.json()); // helps us parse things from incoming requests that ate content-type application/json




// ================ ROUTES ================ //

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

app.get('*', (req, res) => {// star route is the only route that will serve stuff in our project
    res.sendFile(`${__dirname}/index.html`);
});

// ================ Listener ================ //

app.listen(8080, () => console.log(`I'm listening -->> http://localhost:8080`));