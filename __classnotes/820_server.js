const express = require('express');
const app = express(); // creating an instance of express

app.use(express.static('./public'));

app.use(express.json()); // helps us parse things from incoming requests that ate content-type application/json

app.get('*', (req, res) => {// star route is the only route that will serve stuff in our project
    res.sendFile(`${__dirname}/index.html`);
});

app.listen(8080, () => console.log(`I'm listening -->> http://localhost:8080`));