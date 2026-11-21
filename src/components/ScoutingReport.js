import PixelArrow from './PixelArrow';
import { teams } from '../data/players';
import './ScoutingReport.css';

export const playerHref = (player) => `#/players/${player.id}`;

function ScoutingReport({ player, card, total, prev, next, backHref = '#/' }) {
  const team = teams[player.team];
  const role = [player.position, player.number != null && `#${player.number}`]
    .filter(Boolean)
    .join(' · ');

  return (
    <main className={`scouting-report scouting-report--${player.team}`}>
      <header className="scouting-report__header">
        <a className="scouting-report__pill scouting-report__back" href={backHref}>
          <PixelArrow direction="left" />
          Back to draft
        </a>
        <p className="scouting-report__title">Scouting report</p>
        <span className="scouting-report__pill scouting-report__count">
          Card {card}/{total}
        </span>
      </header>

      <div className="scouting-report__body">
        <h1 className="scouting-report__name">{player.name}</h1>
        <p className="scouting-report__role">{role}</p>

        <figure className="scouting-report__card">
          <img src={player.image} alt={`Illustrated portrait of ${player.name}`} />
          <figcaption className="scouting-report__team">
            {team.name} {team.mascot}
          </figcaption>
        </figure>

        <dl className="scouting-report__stats">
          {player.stats.map((stat) => (
            <div className="scouting-report__stat" key={stat.label}>
              <dt>{stat.label}</dt>
              <dd>{stat.value}</dd>
            </div>
          ))}
        </dl>

        <section className="scouting-report__blurb" aria-labelledby="scouting-report-blurb">
          <h2 id="scouting-report-blurb">The report</h2>
          {player.report.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </section>
      </div>

      <nav className="scouting-report__pager" aria-label="Other scouting reports">
        <a
          className="scouting-report__pill scouting-report__prev"
          href={playerHref(prev)}
          aria-label={`Previous report: ${prev.name}`}
        >
          <PixelArrow direction="left" />
          <span>{prev.name}</span>
        </a>
        <a
          className="scouting-report__pill scouting-report__next"
          href={playerHref(next)}
          aria-label={`Next report: ${next.name}`}
        >
          <span>{next.name}</span>
          <PixelArrow direction="right" />
        </a>
      </nav>
    </main>
  );
}

export default ScoutingReport;
