import React, { useState, useEffect } from "react";
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import ScoutingReport, { playerHref } from './components/ScoutingReport';
import { players, teams } from './data/players';
import { useHash } from './shared/hooks';

const WAITING = ['[waiting on Jacob]']; // shown when the doc has no report for a player

const NUMBERS = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];

// [doc key, label shown on the card]. Doc keys look like player_class_one, player_htwt_two, ...
const STAT_FIELDS = [
  ['class', 'Class'],
  ['htwt', 'Ht/wt'],
  ['hometown', 'Hometown'],
  ['previous', 'Previous'],
];

const isUrl = (s) => /^(https?:)?\/\//.test(s || '');

// "Bob Chesney" -> "bob-chesney" (matches the ids in players.js)
const slug = (s) =>
  String(s).trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

// Blank lines in a doc value become separate paragraphs
const toParagraphs = (text) =>
  String(text ?? '').split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean);

// Reads the [players] block into { id: { report: [paragraphs], stats: [{ label, value }] } }
// Empty stat values (e.g. a coach with no class) are dropped so no blank rows render.
function fromPlayersBlock(aml) {
  const raw = aml?.players;
  const src = Array.isArray(raw) ? Object.assign({}, ...raw) : raw ?? {};
  const byId = {};
  NUMBERS.forEach((n) => {
    const title = src[`player_title_${n}`];
    if (!title) return;
    byId[slug(title)] = {
      report: toParagraphs(src[`player_report_${n}`]),
      stats: STAT_FIELDS
        .map(([key, label]) => ({
          label,
          value: String(src[`player_${key}_${n}`] ?? '').trim(),
        }))
        .filter((s) => s.value),
    };
  });
  return byId;
}

// Convert a static player into the card shape ScoutingReport expects
const toCard = (p) => ({
  id: p.id,
  name: p.name,
  role: [p.position, p.number != null && `#${p.number}`].filter(Boolean).join(' · '),
  teamName: `${teams[p.team].name} ${teams[p.team].mascot}`,
  portraitImage: p.image,
  portraitAlt: `Illustrated portrait of ${p.name}`,
  stats: p.stats,
  report: WAITING,
});

function App() {
  const [data, setData] = useState(null);
  const hash = useHash();

  useEffect(() => {
    fetch("https://oink.dailybruin.com/api/packages/flatpages/rivalry-2026")
      .then((res) => res.json())
      .then((res) => setData(res.data['article.aml']))
      .catch((err) => console.error(err));
  }, []);

  // Every route change starts at the top of the page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [hash]);

  const report = data?.scoutingReport ?? {};
  const amlById = Object.fromEntries((report.cards ?? []).map((c) => [c.id, c]));
  const blockData = fromPlayersBlock(data);

  // Priority for report + stats: scoutingReport card > [players] block > players.js / "[waiting on Jacob]".
  // portraitImage only overrides when it's a full URL, so bundled static images keep working.
  const cards = players.map((p) => {
    const base = toCard(p);
    const fromDoc = blockData[p.id] ?? {};
    const { portraitImage, ...aml } = amlById[p.id] ?? {};
    return {
      ...base,
      report: fromDoc.report?.length ? fromDoc.report : base.report,
      stats: fromDoc.stats?.length ? fromDoc.stats : base.stats,
      ...aml,
      portraitImage: isUrl(portraitImage) ? portraitImage : base.portraitImage,
    };
  });

  // Landing page tiles use the AML name and role when a scoutingReport card exists
  const draftTeams = Object.values(teams).map((team) => ({
    id: team.id,
    name: `${team.name} ${team.mascot}`,
    players: players
      .filter((p) => p.team === team.id)
      .map((p) => {
        const a = amlById[p.id];
        return a ? { ...p, name: a.name ?? p.name, position: a.role ?? p.position } : p;
      }),
  }));

  const cardId = hash.match(/^#\/players\/([\w-]+)/)?.[1];
  const index = cards.findIndex((c) => c.id === cardId);
  const card = cards[index];

  return (
    <div className="App">
      <Header />
      {card ? (
        <ScoutingReport
          card={card}
          content={report}
          current={index + 1}
          total={cards.length}
          prev={cards[(index - 1 + cards.length) % cards.length]}
          next={cards[(index + 1) % cards.length]}
        />
      ) : (
        <LandingPage teams={draftTeams} startHref={playerHref(cards[0])} />
      )}
      <Footer />
    </div>
  );
}

export default App;