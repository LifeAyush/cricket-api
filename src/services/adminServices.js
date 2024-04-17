const db = require('../utils/db');

exports.registerAdmin = async (username, password, email) => {
  const query = 'INSERT INTO admins (username, password, email) VALUES ($1, $2, $3) RETURNING *';
  const values = [username, password, email];
  const { rows } = await db.query(query, values);
  return rows[0];
};

exports.loginAdmin = async (username, password) => {
  const query = 'SELECT * FROM admins WHERE username = $1';
  const { rows } = await db.query(query, [username]);
  if (rows.length === 0 || rows[0].password !== password) {
    throw new Error('Incorrect username or password');
  }
  return rows[0];
};

exports.createMatch = async (team1, team2, date, venue) => {
  const query = 'INSERT INTO matches (team1, team2, date, venue) VALUES ($1, $2, $3, $4) RETURNING *';
  const values = [team1, team2, date, venue];
  const { rows } = await db.query(query, values);
  return rows[0];
};

exports.addPlayerToSquad = async (teamId, name, role) => {
  const query = 'INSERT INTO players (name, role) VALUES ($1, $2) RETURNING *';
  const values = [name, role];
  const { rows } = await db.query(query, values);
  const player = rows[0];

  const teamQuery = 'INSERT INTO teams (match_id, player_id) VALUES ($1, $2)';
  await db.query(teamQuery, [teamId, player.id]);

  return player;
};