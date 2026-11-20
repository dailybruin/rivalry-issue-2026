import LandingHeader from './LandingHeader';
import DraftBoard from './DraftBoard';
import PixelArrow from './PixelArrow';
import './LandingPage.css';

function LandingPage({ teams, startHref }) {
  return (
    <main className="landing-page">
      <LandingHeader />
      <DraftBoard teams={teams} />
      <a className="landing-page__start" href={startHref}>
        Press start
        <PixelArrow direction="right" />
      </a>
    </main>
  );
}

export default LandingPage;
