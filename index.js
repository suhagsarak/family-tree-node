
const express = require('express');
const app = express();
const port = 8000;

app.get('/', (req, res) => {
    res.send(`<h2>Hello World</h2>`);
});

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});