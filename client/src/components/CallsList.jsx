import React from 'react';
import IndividualCall from './IndividualCall.jsx';

const CallsList = ({calls, handleSelectCall}) => {

  return (
    <div className="callsListContainer">
      <div className="recentCallsHeader title">Recent Calls</div>
      { calls.length > 0 ?
        calls.map((call) => {
          return <IndividualCall call={call} handleSelectCall={handleSelectCall} key={call.date} />
        })
      : null

      }
    </div>
  );
}

export default CallsList;
