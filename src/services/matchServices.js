const db = require('../utils/db');

exports.getMatches = async () => {
  const query = 'SELECT * FROM matches';
  const { rows } = await db.query(query);
  return rows;
};

exports.getMatchDetails = async (matchId) => {
  const query = `
    SELECT m.id, m.team1, m.team2, m.date, m.venue, m.status,
           json_agg(json_build_object('player_id', p.id, 'name', p.name)) AS squads
    FROM matches m
    LEFT JOIN teams t ON m.id = t.match_id
    LEFT JOIN players p ON t.player_id = p.id
    WHERE m.id = $1
    GROUP BY m.id, m.team1, m.team2, m.date, m.venue, m.status
  `;
  const { rows } = await db.query(query, [matchId]);
  return rows[0];
};

exports.getPlayerStats = async (playerId) => {
  const query = 'SELECT * FROM players WHERE id = $1';
  const { rows } = await db.query(query, [playerId]);
  return rows[0];
};