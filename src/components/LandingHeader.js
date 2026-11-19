import './LandingHeader.css';

function LandingHeader({
  publication = 'Daily Bruin',
  title = 'Rivalry Draft',
  edition = 'UCLA vs USC 2026',
  subtitle = 'Crosstown showdown · Select a card to open the scouting report',
}) {
  return (
    <header className="landing-header">
      <div className="landing-header__bar">
        <span className="landing-header__tag">{publication}</span>
        <h1 className="landing-header__title">
          <span aria-hidden="true">★ </span>
          {title}
          <span aria-hidden="true"> ★</span>
        </h1>
        <span className="landing-header__tag">{edition}</span>
      </div>
      <p className="landing-header__subtitle">{subtitle}</p>
    </header>
  );
}

export default LandingHeader;