require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const db = require('../database');

const app = express();
const PORT = process.env.PORT || 3000 ;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/../client/dist'));

// store id and meeting title associated to most recent bot in the server
let currentBotId = '';
let currentMeetingTitle = '';

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
    console.log('unable to send bot to meeting', err)
    res.send('unable to send bot to meeting');
  });
});

app.post('/setBotIdServerSide', (req, res) => {
  currentBotId = req.body.botIdServerSide;
  res.sendStatus(200);
});

app.post('/recallWebhook', (req, res) => {
  /* OPTIONAL webhook verification
  To include webhook verification, add RECALLWEBHOOKVALIDATION to your local .env file and set this equal to a unique string you have created. Next, update the webhook endpoint in your Recall.ai dashboard to include this string as a query parameter.

  To remove webhook verification, remove 'req.query.webhookToken === process.env.RECALLWEBHOOKVALIDATION' from the if statement in the following line
  */
  if (req.body.data.status.code === 'done' && req.query.webhookToken === process.env.RECALLWEBHOOKVALIDATION) {
    axios.get(`https://api.recall.ai/api/v1/bot/${currentBotId}`,  {
    headers: {
      "Authorization": 'Token ' + process.env.RECALL,
      "Content-Type": 'application/json',
    }
  })
  .then((response)=> {
    let url = response.data.video_url;
    let title = response.data.meeting_metadata.title;
    // store meeting information in database
    db.addMeeting(title, url)
    .then(()=> {
      currentMeetingTitle = title;
      axios.get(`https://api.recall.ai/api/v1/bot/${currentBotId}/transcript`,{
        headers: {
          "Authorization": 'Token ' + process.env.RECALL,
          "Content-Type": 'application/json',
        }
      })
      .then((recallResponse) => {
        console.log("ANALYSIS WORDS ", recallResponse.data[0]);
        // Rudimentary tests to determine if specific topics are covered on the call
        let generalCheckin = recallResponse.data[0].words.filter((word) => word.text.toLowerCase() === 'thank' || word.text.toLowerCase() === 'thank.').length > 0;
        let currentPromotions = recallResponse.data[0].words.filter((word) => word.text.toLowerCase() === 'offer' || word.text.toLowerCase() === 'offer.').length > 0;
        let currentSpend = recallResponse.data[0].words.filter((word) => word.text.toLowerCase() === 'spend' || word.text.toLowerCase() === 'spend.').length > 0;
        let nextSteps = recallResponse.data[0].words.filter((word) => word.text.toLowerCase() === 'steps' || word.text.toLowerCase() === 'steps.').length > 0;
        let talkingPointsBreakdown = [{'a': generalCheckin.toString()}, {'b': currentPromotions.toString()},{'c': currentSpend.toString()},{'d': nextSteps.toString()}]

        // Determine score based on talking points results (true equal to one)
        let score = ((generalCheckin + currentPromotions + currentSpend + nextSteps) / 4) * 100;

        // update meeting in database with analysis results
        db.updateMeeting(currentMeetingTitle, talkingPointsBreakdown, score)
          .then(() => {
            console.log('updated meeting with talking point results');
            res.send('updated meeting with talking point results');
          })
          .catch((err) => {
            console.log('unable to update meeting and complete analysis ', err);
            res.send('unable to update meeting and complete analysis');
      });
      })
      .catch((err) => res.send('unable to get bot transcript'));
    })
    .catch((err)=> {
      console.log('can\'t update meeting in database', err);
      res.send('unable to update meeting in database');
    })
  })
  .catch((err)=> {
    console.log('unable to get information about bot ', err);
    res.sendStatus(500)
  });
  }
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

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
