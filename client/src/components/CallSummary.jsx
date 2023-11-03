import React from 'react';

const CallSummary = ({ callSummaryInfo }) => {
  console.log('CALL ', callSummaryInfo);
  return (
    <div className="callSummaryContainer">
      <div className="title">Call Summary</div>
      <div className="callSummaryMetadata">
        <div>Call Recording: https://us04web.zoom.us/j/{callSummaryInfo[0]._id}</div>
      </div>
      <div className="callSummaryScorecardContainer">
        <div className="titleTwo">Key Talking Points Scorecard</div>
        <div className="callSummaryScorecardResults">
          <div>Overall</div>
          <div>{callSummaryInfo[0].score}</div>
        </div>
      </div>
      <div className="callSummaryTalkingPointsContainer">
        <div className="titleTwo">Key Talking Points Breakdown</div>
        <div className="callSummaryTalkingPointsResultsContainer">
          <div className="callSummaryIndividualTalkingPointContainer">
            <div>General Checkin</div>
            <div>{callSummaryInfo[0].talkingPointsBreakdown[0].a === 'true' ? <div className="trueResult">covered</div>
            :  <div className="falseResult">not covered</div>}
            </div>
          </div>
          <div className="callSummaryIndividualTalkingPointContainer">
            <div>Current Promotions</div>
            <div>{callSummaryInfo[0].talkingPointsBreakdown[1].b === 'true' ? <div className="trueResult">covered</div>
            :  <div className="falseResult">not covered</div>}
            </div>
          </div>
          <div className="callSummaryIndividualTalkingPointContainer">
            <div>Current Spend</div>
            <div>{callSummaryInfo[0].talkingPointsBreakdown[2].c === 'true' ? <div className="trueResult">covered</div>
            :  <div className="falseResult">not covered</div>}
            </div>
          </div>
          <div className="callSummaryIndividualTalkingPointContainer">
            <div>Next Steps</div>
            <div>{callSummaryInfo[0].talkingPointsBreakdown[3].d === 'true' ? <div className="trueResult">covered</div>
            :  <div className="falseResult">not covered</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CallSummary;
