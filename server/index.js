require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database');

const app = express();
const PORT = process.env.PORT || 3000 ;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/../client/dist'));

app.post('/testing', (req, res) => {
  db.addUser()
    .then(()=> {
      res.send('document created!');
    })
    .catch((err)=> {
      console.log('can\'t create document ', err);
      res.send('unable to create document');
    })
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
