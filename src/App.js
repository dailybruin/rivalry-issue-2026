import React from 'react';
import ScoutingReportPage from './components/scouting/ScoutingReportPage';
import scoutingData from './data/scoutingReport.json';

function App() {
  return <ScoutingReportPage data={scoutingData} />;
}

export default App;
