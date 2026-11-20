import { playerHref } from './ScoutingReport';
import './PlayerCard.css';

// Badge text per the Figma landing cards. Unknown positions fall back to their first letters.
const POSITION_ABBR = {
  'Head coach': 'HC',
  Quarterback: 'QB',
  'Running back': 'RB',
  'Wide receiver': 'WR',
  Linebacker: 'LB',
  'Defensive end': 'DE',
};

const abbreviate = (position) =>
  POSITION_ABBR[position] ?? position.split(' ').map((word) => word[0]).join('').toUpperCase();

// The whole card is one link, so any click on it opens the scouting report.
// ponytail: minimal thumbnail so the draft board renders; the Player Thumbnail Card task can restyle it.
function PlayerCard({ player }) {
  return (
    <a
      className={`player-card player-card--${player.team}`}
      href={playerHref(player)}
      aria-label={`Open scouting report: ${player.name}`}
    >
      <span className="player-card__badge">{abbreviate(player.position)}</span>
      <span className="player-card__number">
        {player.number != null ? `#${player.number}` : 'Coach'}
      </span>
      <img className="player-card__image" src={player.image} alt="" />
      <span className="player-card__name">{player.name}</span>
    </a>
  );
}

export default PlayerCard;
