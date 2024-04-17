const db = require('../utils/db');

class Player {
  static async create(name, role, matchesPlayed, runs, average, strikeRate) {
    const query = `
      INSERT INTO players (name, role, matches_played, runs, average, strike_rate)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const values = [name, role, matchesPlayed, runs, average, strikeRate];
    const { rows } = await db.query(query, values);
    return rows[0];
  }

  static async getById(id) {
    const query = 'SELECT * FROM players WHERE id = $1';
    const { rows } = await db.query(query, [id]);
    return rows[0];
  }

  static async addToTeam(teamId, playerId) {
    const query = 'INSERT INTO teams (match_id, player_id) VALUES ($1, $2)';
    await db.query(query, [teamId, playerId]);
  }
}

module.exports = Player;