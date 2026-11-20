import TeamRow from './TeamRow';
import './DraftBoard.css';

function DraftBoard({ teams }) {
  return (
    <div className="draft-board">
      {teams.map((team) => (
        <TeamRow key={team.id} team={team} />
      ))}
    </div>
  );
}

export default DraftBoard;