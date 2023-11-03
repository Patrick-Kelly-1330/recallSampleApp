const mongoose = require('mongoose');
// Optional: change name of default database
mongoose.connect('mongodb://localhost/recallSampleDatabase');

const db = mongoose.connection;

const salesMeeting = mongoose.Schema({
  callName: String,
  meetingLink: String,
  date: String,
  score: Number,
  talkingPointsBreakdown: Array,
});

const Meeting = mongoose.model('salesMeetings', salesMeeting);

db.on('error', () => {
  console.log('unable to connect to mongoose');
});

db.once('open', () => {
  console.log('mongoose connected successfully');
});

module.exports = {
  // add meeting to database
  addMeeting: (meetingTitle, url) => {
    let currentDate = new Date().toString().slice(0,15);
    return Meeting.create({
      callName: meetingTitle,
      meetingLink: url,
      date: currentDate,
    });
  },
  // get all meetings from database
  getMeetings: () => Meeting.find({}),
  // update meeting in database with results of transcript analysis
  updateMeeting: (meetingTitle, results, scoreResults) => {
    return Meeting.updateOne({ callName: meetingTitle }, {
      talkingPointsBreakdown: results,
      score: scoreResults,
    });
  },
}