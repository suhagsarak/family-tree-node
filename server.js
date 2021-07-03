
const express = require('express');
const app = express();
const config = require("config");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Initialize db tables
const db = require("./db/db");
db.sequelize.sync();

// Route to respecticve controllers
app.use('/individuals', require('./controllers/individuals.controller'));
app.use('/roles', require('./controllers/roles.controller'));
app.use('/families', require('./controllers/families.controller'));
app.use('/relations', require('./controllers/relations.controller'));

// test API
app.get('/', (req, res) => {
    res.send(`<h2 style="position: absolute; left: 30%; top: 5%;">Family Tree Server Running...</h2>`);
});

// Listen
app.listen(config.get('port'), () => {
    console.log(`Listening on port: ${config.get('port')}`);
});