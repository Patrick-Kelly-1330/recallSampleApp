import React from 'react';

const IndividualCall = ({ call, handleSelectCall }) => {
  return (
    <div className="individualCallContainer" id={call.callName} onClick={handleSelectCall}>
      <div className="individualCallDate"  id={call.callName}>{call.date}</div>
      <div className="individualCallcallName" id={call.callName}>{call.callName}</div>
    </div>
  );
}

export default IndividualCall;
