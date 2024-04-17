const adminService = require('../services/adminServices');
const jwt = require('../utils/jwt');

exports.registerAdmin = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const admin = await adminService.registerAdmin(username, password, email);
    res.status(200).json({
      status: 'Admin Account successfully created',
      status_code: 200,
      user_id: admin.id,
    });
  } catch (error) {
    res.status(400).json({ status: error.message, status_code: 400 });
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await adminService.loginAdmin(username, password);
    const token = jwt.generateToken(admin.id);
    res.status(200).json({
      status: 'Login successful',
      status_code: 200,
      user_id: admin.id,
      access_token: token,
    });
  } catch (error) {
    res.status(401).json({
      status: 'Incorrect username/password provided. Please retry',
      status_code: 401,
    });
  }
};

exports.createMatch = async (req, res) => {
  try {
    const { team1, team2, date, venue } = req.body;
    const match = await adminService.createMatch(team1, team2, date, venue);
    res.status(200).json({
      message: 'Match created successfully',
      match_id: match.id,
    });
  } catch (error) {
    res.status(400).json({ status: error.message, status_code: 400 });
  }
};

exports.addPlayerToSquad = async (req, res) => {
  try {
    const { teamId } = req.params;
    const { name, role } = req.body;
    const player = await adminService.addPlayerToSquad(teamId, name, role);
    res.status(200).json({
      message: 'Player added to squad successfully',
      player_id: player.id,
    });
  } catch (error) {
    res.status(400).json({ status: error.message, status_code: 400 });
  }
};