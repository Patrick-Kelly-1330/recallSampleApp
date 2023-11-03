import React from 'react';
import CallsList from './CallsList.jsx';

const Calls = ({ teamMembers, calls, handleSelectCall }) => {

  return (
    <div className="callsContainer">
      <CallsList calls={calls} handleSelectCall={handleSelectCall} />
    </div>
  );
}

export default Calls;
