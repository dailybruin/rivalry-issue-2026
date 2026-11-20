import LandingHeader from './LandingHeader';
import DraftBoard from './DraftBoard';
import './LandingPage.css';

function LandingPage({ teams }) {
  return (
    <main className="landing-page">
      <LandingHeader />
      <DraftBoard teams={teams} />
    </main>
  );
}

export default LandingPage;