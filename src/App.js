import React, { useEffect } from "react";
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import ScoutingReport from './components/ScoutingReport';
import { players } from './data/players';
import { useHash } from './shared/hooks';

function App() {
  const hash = useHash();
  const playerId = hash.match(/^#\/players\/([\w-]+)/)?.[1];
  // TODO: render the draft board (landing page) when no player is selected.
  const index = Math.max(0, players.findIndex((player) => player.id === playerId));
  const player = players[index];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [player.id]);

  return (
    <div className="App">
      <Header/>
      <ScoutingReport
        player={player}
        card={index + 1}
        total={players.length}
        prev={players[(index - 1 + players.length) % players.length]}
        next={players[(index + 1) % players.length]}
      />
      <Footer/>
    </div>
  );
}

export default App;
