import React from 'react';

const CallSummary = ({ callSummaryInfo }) => {
  return (
    <div className="callSummaryContainer">
      <div className="callSummaryTitle">Call Summary</div>
      <div className="callSummaryMetadata">
        <div className="callSummaryMetadataTitle">Call Recording</div>
        <div>https://us04web.zoom.us/j/{callSummaryInfo[0]._id}</div>
      </div>
      <div className="callSummaryScorecardContainer">
        <div className="callSummaryScorecardTitle">Key Talking Points Scorecard</div>
        <div className="callSummaryScorecardResults">
          <div className="callSummaryScorecardResultsTitle">Overall</div>
          <div className="callSummaryScorecardResultsScore">{callSummaryInfo[0].score.toString().replace('0.','')}%</div>
        </div>
      </div>
      <div className="callSummaryTalkingPointsContainer">
        <div className="callSummaryTalkingPointsTitle">Key Talking Points Breakdown</div>
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
