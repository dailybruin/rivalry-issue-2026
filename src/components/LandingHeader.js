import PixelStar from './PixelStar';
import './LandingHeader.css';

function LandingHeader({
  publication = 'Daily Bruin',
  publicationHref = 'https://dailybruin.com',
  title = 'Rivalry Draft',
  edition = 'UCLA vs USC 2026',
  subtitle = 'Crosstown showdown · Select a card to open the scouting report',
}) {
  return (
    <header className="landing-header">
      <div className="landing-header__bar">
        <a className="landing-header__tag landing-header__tag--link" href={publicationHref}>
          {publication}
        </a>
        <h1 className="landing-header__title">
          <PixelStar />
          {title}
          <PixelStar />
        </h1>
        <span className="landing-header__tag">{edition}</span>
      </div>
      <p className="landing-header__subtitle">{subtitle}</p>
    </header>
  );
}

export default LandingHeader;