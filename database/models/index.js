const mongoose = require('mongoose');

function main() {
  // TODO: update [dataseName] with relevant database name
  mongoose.connect('mongodb://127.0.0.1:27017/[databaseName]');

  // TODO: build out schema(s)
  const testSchema = mongoose.Schema({
  });

  // TODO: create relevant models
  const Test = mongoose.model('TestSchema', testSchema);

  module.exports = Test;
}

main();
