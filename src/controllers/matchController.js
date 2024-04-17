const matchService = require('../services/matchServices');

exports.getMatches = async (req, res) => {
  try {
    const matches = await matchService.getMatches();
    res.status(200).json({ matches });
  } catch (error) {
    res.status(400).json({ status: error.message, status_code: 400 });
  }
};

exports.getMatchDetails = async (req, res) => {
  try {
    const { matchId } = req.params;
    const match = await matchService.getMatchDetails(matchId);
    res.status(200).json(match);
  } catch (error) {
    res.status(400).json({ status: error.message, status_code: 400 });
  }
};

exports.getPlayerStats = async (req, res) => {
  try {
    const { playerId } = req.params;
    const playerStats = await matchService.getPlayerStats(playerId);
    res.status(200).json(playerStats);
  } catch (error) {
    res.status(400).json({ status: error.message, status_code: 400 });
  }
};