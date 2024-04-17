const db = require('../utils/db');

class Match {
  static async create(team1, team2, date, venue) {
    const query = 'INSERT INTO matches (team1, team2, date, venue) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [team1, team2, date, venue];
    const { rows } = await db.query(query, values);
    return rows[0];
  }

  static async getAll() {
    const query = 'SELECT * FROM matches';
    const { rows } = await db.query(query);
    return rows;
  }

  static async getById(id) {
    const query = `
      SELECT m.id, m.team1, m.team2, m.date, m.venue, m.status,
             json_agg(json_build_object('player_id', p.id, 'name', p.name)) AS squads
      FROM matches m
      LEFT JOIN teams t ON m.id = t.match_id
      LEFT JOIN players p ON t.player_id = p.id
      WHERE m.id = $1
      GROUP BY m.id, m.team1, m.team2, m.date, m.venue, m.status
    `;
    const { rows } = await db.query(query, [id]);
    return rows[0];
  }
}

module.exports = Match;