import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Header from './Header.jsx';
import Main from './Main.jsx';
import SendBot from './SendBot.jsx';
import sampleCalls from '../../dist/sampleData.js';

const App = () => {
  // sample team members list to demonstrate use of app by a team
  const [teamMembers, setTeamMembers] = useState(['Johnathan Samuels', 'Michael Singer', 'Jake Tully', 'Sarah Williams', 'Stephanie Miller']);
  // sample data stored in repository
  const [calls, setCalls] = useState(sampleCalls);
  const [sendBotVisible, setSendBotVisible] = useState(false);
  const [botId, setBotId] = useState(''); // 8cd373ff-0143-45be-a275-13aacfc09fcc
  const [menuVisible, setMenuVisible] = useState(false);
  const [meetingURL, setMeetingURL] = useState('');
  // sample data available when app is first run
  const [callSummaryInfo, setCallSummaryInfo] = useState([{
    date:'10/22/23',
    callName:'Soda Unlimited',
    meetingLink: 'https://meet.google.com/mdu-byoe-rqc',
    score: 100,
    talkingPointsBreakdown: [{'a': 'true'}, {'b': 'true'},{'c': 'true'},{'d': 'true'}]
  }]);

  const handleMenuClick = () => {
    setMenuVisible(!menuVisible);
  }

  const handleSetBotVisible = () => {
    setSendBotVisible(true);
    setMenuVisible(!menuVisible);
  }

  const handleSetAdminVisible = () => {
    setSendBotVisible(false);
    setMenuVisible(!menuVisible);
  }

  const handleSendBot = () => {
    Axios.post('/sendBotToMeeting', {
      meeting_url: meetingURL,
    })
    .then((recallResponseId) => {
      setBotId(recallResponseId.data)
      Axios.post('/setBotIdServerSide', {
        botIdServerSide: recallResponseId.data,
      })
      .then(()=> console.log('saved botId in server'))
      .catch((err) => console.log('unable to set bot in server ', err));
    })
    .catch((err) => console.log('unable to send bot to meeting', err));
    setSendBotVisible(false);
  }

  // update Call Summary information based on call selected by user in Recent Calls list
  const handleSelectCall = (e) => {
    const selectedName = e.target.id;
    const selectedCall = calls.filter((call) => {
      return call.callName === selectedName;
    })
    setCallSummaryInfo([selectedCall[0]]);
  }

  const handleGetAllMeetings = () => {
    Axios.get('/meetings')
      .then((meetingInfo) => {
        setCalls(meetingInfo.data)
        console.log('MEETING ', meetingInfo.data);
      })
      .catch((err) => console.log('unable to get meetings from database ', err));
  }

  useEffect(()=> {
    // access meetings from database upon page load
    handleGetAllMeetings();
  }, [])

  if (sendBotVisible) {
    return (
      <div>
        <Header
          handleMenuClick={handleMenuClick}
          handleSetBotVisible={handleSetBotVisible}
          handleSetAdminVisible={handleSetAdminVisible}
          menuVisible={menuVisible}
          handleGetAllMeetings={handleGetAllMeetings}
        />
        <SendBot teamMembers={teamMembers} setMeetingURL={setMeetingURL} handleSendBot={handleSendBot} />
      </div>
    )
  } else {
    return (
      <div>
        <Header
          handleMenuClick={handleMenuClick}
          handleSetBotVisible={handleSetBotVisible}
          handleSetAdminVisible={handleSetAdminVisible}
          menuVisible={menuVisible}
          handleGetAllMeetings={handleGetAllMeetings}
        />
        <Main
          calls={calls}
          handleSelectCall={handleSelectCall}
          callSummaryInfo={callSummaryInfo}
        />
      </div>
    );
  }
}

export default App;
