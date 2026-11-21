import PixelArrow from './PixelArrow';
import './ScoutingReport.css';

export const playerHref = (card) => `#/players/${card.id}`;

const DEFAULT_CONTENT = {
  headerTitle: 'Scouting Report',
  reportLabel: 'The Report',
  backButtonLabel: 'Back to Draft',
  backButtonHref: '#/',
  cardCounterFormat: 'CARD {current}/{total}',
};

function ScoutingReport({ card, content = {}, current, total, prev, next }) {
  const c = { ...DEFAULT_CONTENT, ...content };
  const backHref = c.backButtonHref || DEFAULT_CONTENT.backButtonHref;
  const teamKey = (card.teamName || '').split(' ')[0].toLowerCase(); // "USC Trojans" -> "usc"
  const stats = card.stats ?? [];
  const paragraphs = [].concat(card.report ?? []);
  const counter = c.cardCounterFormat
    .replace('{current}', current)
    .replace('{total}', total);

  return (
    <main className={`scouting-report scouting-report--${teamKey}`}>
      <header className="scouting-report__header">
        <a className="scouting-report__pill scouting-report__back" href={backHref}>
          <PixelArrow direction="left" />
          {c.backButtonLabel}
        </a>
        <p className="scouting-report__title">{c.headerTitle}</p>
        <span className="scouting-report__pill scouting-report__count">{counter}</span>
      </header>

      <div className="scouting-report__body">
        <h1 className="scouting-report__name">{card.name}</h1>
        <p className="scouting-report__role">{card.role}</p>

        <figure
          className="scouting-report__card"
          style={card.portraitBackgroundColor ? { backgroundColor: card.portraitBackgroundColor } : undefined}
        >
          {/* portraitImage is the same imported image the landing page uses (or a full URL from the doc) */}
          <img src={card.portraitImage} alt={card.portraitAlt || `Portrait of ${card.name}`} />
          <figcaption className="scouting-report__team">{card.teamName}</figcaption>
        </figure>

        <dl className="scouting-report__stats">
          {stats.map((stat) => (
            <div className="scouting-report__stat" key={stat.label}>
              <dt>{stat.label}</dt>
              <dd>{stat.value}</dd>
            </div>
          ))}
        </dl>

        <section className="scouting-report__blurb" aria-labelledby="scouting-report-blurb">
          <h2 id="scouting-report-blurb">{c.reportLabel}</h2>
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
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