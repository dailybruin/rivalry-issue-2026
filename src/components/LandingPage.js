import LandingHeader from './LandingHeader';
import DraftBoard from './DraftBoard';
import './LandingPage.css';

function LandingPage({ teams, startHref }) {
  return (
    <main className="landing-page">
      <LandingHeader />
      <DraftBoard teams={teams} />
      <a className="landing-page__start" href={startHref}>
        {/* Figma sets the ▶ in Press Start 2P itself. U+FE0E forces text (not emoji) presentation on iOS. */}
        Press start <span aria-hidden="true">{'▶︎'}</span>
      </a>
    </main>
  );
}

export default LandingPage;
