const db = require('../utils/db');

class Team {
  static async create(matchId, playerId) {
    const query = 'INSERT INTO teams (match_id, player_id) VALUES ($1, $2)';
    await db.query(query, [matchId, playerId]);
  }

  static async getPlayersByMatchId(matchId) {
    const query = 'SELECT player_id FROM teams WHERE match_id = $1';
    const { rows } = await db.query(query, [matchId]);
    return rows.map((row) => row.player_id);
  }
}

module.exports = Team;