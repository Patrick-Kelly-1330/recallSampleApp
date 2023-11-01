const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/controllers');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/../client/dist'));
console.log('DIR ', __dirname);

app.post('/testing', (req, res) => {
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
