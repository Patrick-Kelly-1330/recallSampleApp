require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const db = require('../database');

const app = express();
const PORT = process.env.PORT || 3000 ;

// store id and meeting title associated to most recent bot in the server
let currentBotId = '';
let currentMeetingTitle = '';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/../client/dist'));

app.post('/sendBotToMeeting', (req, res) => {
  axios.post('https://api.recall.ai/api/v1/bot', {
    meeting_url: req.body.meeting_url,
    bot_name: 'Sales Assistant',
    transcription_options: {
      "provider":"default"
    },
  }, {
    headers: {
      "Authorization": 'Token ' + process.env.RECALL,
      "Content-Type": 'application/json',
    }
  })
  .then((recallResponse) => {
    res.send(recallResponse.data.id);
  })
  .catch((err) => {
    console.log('unable to send bot ', err)
    res.send('unable to send bot to meeting');
  });
});

app.post('/setBotIdServerSide', (req, res) => {
  currentBotId = req.body.botIdServerSide;
  res.sendStatus(200);
});

// TODO: add query parameter to validate webhook coming from recall
app.post('/recallWebhook', (req, res) => {
  if (req.body.data.status.code === 'done') {
    console.log('meeting ended');
    // get information about the meeting then store it in the database
    axios.get(`https://api.recall.ai/api/v1/bot/${currentBotId}`,  {
    headers: {
      "Authorization": 'Token ' + process.env.RECALL,
      "Content-Type": 'application/json',
    }
  })
  .then((response)=> {
    let url = response.data.video_url;
    let title = response.data.meeting_metadata.title;
    db.addMeeting(title, url)
    .then(()=> {
      console.log('meeting added!')
      currentMeetingTitle = title;
      // res.sendStatus(200)
      axios.get(`https://api.recall.ai/api/v1/bot/${currentBotId}/transcript`,{
        headers: {
          "Authorization": 'Token ' + process.env.RECALL,
          "Content-Type": 'application/json',
        }
      })
      .then((recallResponse) => {
        // Rudimentary tests to determine if specific themes are covered on the call
        // General checkin
        let generalCheckin = recallResponse.data[0].words.filter((word) => word.text.toLowerCase() === 'thank').length > 0;
        // Current promotions
        let currentPromotions = recallResponse.data[0].words.filter((word) => word.text.toLowerCase() === 'offer').length > 0;
        // Current spend overview
        let currentSpend = recallResponse.data[0].words.filter((word) => word.text.toLowerCase() === 'spend').length > 0;
        // Next steps review
        let nextSteps = recallResponse.data[0].words.filter((word) => word.text.toLowerCase() === 'steps').length > 0;
        let talkingPointsBreakdown = [{'a': generalCheckin.toString()}, {'b': currentPromotions.toString()},{'c': currentSpend.toString()},{'d': nextSteps.toString()}]
        // Determine score based on talking points results
        let score = (4 - generalCheckin - currentPromotions - currentSpend - nextSteps) / 4;
        db.updateMeeting(currentMeetingTitle, talkingPointsBreakdown, score)
          .then(() => res.send('updated meeting with talking point results'))
          .catch((err) => res.send('unable to update meeting and complete analysis'));
      })
      .catch((err) => res.send('unable to get bot transcript'));
    })
    .catch((err)=> {
      console.log('can\'t create document ', err);
      res.send('unable to create document');
    })
  })
  .catch((err)=> {
    console.log('unable to get information about bot ', err);
    res.sendStatus(500)
  });
  }
});

// TO DELETE TOMORROW determine if employee covered specific topics on the call
app.get('/analyzeTranscript', (req, res) => {
  axios.get('https://api.recall.ai/api/v1/bot/6a002fed-5688-4f91-952e-285b2fba4add/transcript',{
    headers: {
      "Authorization": 'Token ' + process.env.RECALL,
      "Content-Type": 'application/json',
    }
  })
  .then((recallResponse) => {
    // Rudimentary tests to determine if specific themes are covered on the call
    // General checkin
    let generalCheckin = recallResponse.data[0].words.filter((word) => word.text.toLowerCase() === 'thank').length > 0;
    // Current promotions
    let currentPromotions = recallResponse.data[0].words.filter((word) => word.text.toLowerCase() === 'offer').length > 0;
    // Current spend overview
    let currentSpend = recallResponse.data[0].words.filter((word) => word.text.toLowerCase() === 'spend').length > 0;
    // Next steps review
    let nextSteps = recallResponse.data[0].words.filter((word) => word.text.toLowerCase() === 'steps').length > 0;
    let talkingPointsBreakdown = [{'a': generalCheckin.toString()}, {'b': currentPromotions.toString()},{'c': currentSpend.toString()},{'d': nextSteps.toString()}]
    // Determine score based on talking points results
    let score = (4 - generalCheckin - currentPromotions - currentSpend - nextSteps) / 4;
        db.updateMeeting('Grand Express', talkingPointsBreakdown, score)
          .then(() => {
            res.sendStatus('updated meeting with talking point results')
          })
          .catch((err) => res.send('unable to update meeting and complete analysis'));
      })
  .catch((err) => res.send('unable to get bot transcript'));
});

// get all meetings
app.get('/meetings', (req, res) => {
  db.getMeetings()
    .then((meetings) => res.send(meetings))
    .catch((err) => {
      console.log('unable to get meetings ', err);
      res.send(500);
    })
});

app.get('/serverCheck', (req, res) => {
  axios.get('https://api.recall.ai/api/v1/bot/192b64c6-2ae8-492b-b405-ff58582e84a6',  {
    headers: {
      "Authorization": 'Token ' + process.env.RECALL,
      "Content-Type": 'application/json',
    }
  })
  .then((response)=> {
    console.log('information about BOT ', response.data)
    let url = response.data.video_url;
    let title = response.data.meeting_metadata.title;
    db.addMeeting(title, url)
      .then(()=> {
        console.log('meeting added!')
        res.sendStatus(200)
      })
      .catch((err)=> {
        console.log('can\'t create document ', err);
        res.send('unable to create document');
      })
  })
  .catch((err)=> {
    console.log('unable to get information about bot ', err);
    res.sendStatus(500)
  });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
