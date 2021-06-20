
const express = require('express');
const app = express();
const cors = require("cors");
const port = 8000;

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const db = require("./db/db");
// db.sequelize.sync();


app.use('/individuals', require('./controllers/individuals.controller'));
app.use('/roles', require('./controllers/roles.controller'));
app.use('/families', require('./controllers/families.controller'));
app.use('/relations', require('./controllers/relations.controller'));



app.get('/', (req, res) => {
    res.send(`<h2 style="position: absolute; left: 30%; top: 5%;">Family Tree Server Running...</h2>`);
});

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});