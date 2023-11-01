const mongoose = require('mongoose');
// TODO: update [dataseName] with relevant database name
mongoose.connect('mongodb://localhost/[databaseName]');

const db = mongoose.connection;

db.on('error', () => {
  console.log('mongoose connection error');
});

db.once('open', () => {
  console.log('mongoose connected successfully');
});

module.exports = db;