import React, { useEffect } from "react";
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import ScoutingReport, { playerHref } from './components/ScoutingReport';
import { players, teams } from './data/players';
import { useHash } from './shared/hooks';

// Routes (hash-based, so the static flatpage build needs no server config):
//   #/                -> landing page / draft board
//   #/players/<id>    -> that player's scouting report
// Unknown player ids fall back to the landing page.

// Draft board rows: one per team, labelled "UCLA Bruins" / "USC Trojans" as in the Figma.
const draftTeams = Object.values(teams).map((team) => ({
  id: team.id,
  name: `${team.name} ${team.mascot}`,
  players: players.filter((player) => player.team === team.id),
}));

// "Press start" opens Bob Chesney's report. Looked up by id so reordering the roster can't change it.
const startPlayer = players.find((player) => player.id === 'bob-chesney');

function App() {
  const hash = useHash();
  const playerId = hash.match(/^#\/players\/([\w-]+)/)?.[1];
  const index = players.findIndex((player) => player.id === playerId);
  const player = players[index];

  // Every route change starts at the top of the page.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [hash]);

  return (
    <div className="App">
      <Header/>
      {player ? (
        <ScoutingReport
          player={player}
          card={index + 1}
          total={players.length}
          prev={players[(index - 1 + players.length) % players.length]}
          next={players[(index + 1) % players.length]}
        />
      ) : (
        <LandingPage teams={draftTeams} startHref={playerHref(startPlayer)} />
      )}
      <Footer/>
    </div>
  );
}

export default App;
