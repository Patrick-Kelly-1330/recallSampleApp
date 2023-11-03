const mongoose = require('mongoose');
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
  addMeeting: (meetingTitle, url) => {
    let currentDate = new Date().toString().slice(0,15);
    return Meeting.create({
      callName: meetingTitle,
      meetingLink: url,
      date: currentDate,
    });
  },
  getMeetings: () => Meeting.find({}),
  updateMeeting: (meetingTitle, results, scoreResults) => {
    return Meeting.updateOne({ callName: meetingTitle }, {
      talkingPointsBreakdown: results,
      score: scoreResults,
    });
  },
}