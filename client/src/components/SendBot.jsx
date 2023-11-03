import React from 'react';

const SendBot = ({ teamMembers, setMeetingURL, handleSendBot }) => {

  return (
    <div className="sendBotContainer">
      <div>Select your name</div>
      <select className="teamMemberList">{teamMembers.length > 0 ?
        teamMembers.map((teamMember) => {
          return ( <option value={teamMember} key={teamMember}>{teamMember}</option>)
        })
      : null
        }
      </select>
      <div>Meeting Link</div>
      <input type="text" onChange={(e)=> setMeetingURL(e.target.value)}></input>
      <div onClick={handleSendBot}>Send Bot to Meeting</div>
    </div>
  );
}

export default SendBot;
