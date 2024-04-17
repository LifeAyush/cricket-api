const db = require('../utils/db');

class Admin {
  static async create(username, password, email) {
    const query = 'INSERT INTO admins (username, password, email) VALUES ($1, $2, $3) RETURNING *';
    const values = [username, password, email];
    const { rows } = await db.query(query, values);
    return rows[0];
  }

  static async findByUsername(username) {
    const query = 'SELECT * FROM admins WHERE username = $1';
    const { rows } = await db.query(query, [username]);
    return rows[0];
  }
}

module.exports = Admin;