import PlayerCard from './PlayerCard';

function TeamRow({ team }) {
  return (
    <section className={`team-row team-row--${team.id}`} aria-label={team.name}>
      <h2 className="team-row__label">{team.name}</h2>
      <div className="team-row__cards">
        {team.players.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>
    </section>
  );
}

export default TeamRow;