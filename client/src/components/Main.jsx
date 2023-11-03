import React, { useState } from 'react';
import Calls from './Calls.jsx';
import CallSummary from './CallSummary.jsx';

const Main = ({ handleSelectCall, callSummaryInfo, calls }) => {
  return (
    <div className="mainContainer">
      <Calls calls={calls} handleSelectCall={handleSelectCall}/>
      <CallSummary callSummaryInfo={callSummaryInfo}/>
    </div>
  );
}

export default Main;
