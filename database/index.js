const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/recallSampleDatabase');

const db = mongoose.connection;

const salesRep = mongoose.Schema({
  name: String,
  meetings: Array,
});

const Test = mongoose.model('SalesReps', salesRep);

db.on('error', () => {
  console.log('unable to connect to mongoose');
});

db.once('open', () => {
  console.log('mongoose connected successfully');
});

module.exports = {
  addUser: () => {
    return Test.create({
      name:'Second from App',
      meetings: [],
    });
  },
}