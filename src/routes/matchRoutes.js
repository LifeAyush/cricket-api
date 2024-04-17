const express = require('express');
const matchController = require('../controllers/matchController');

const router = express.Router();

router.get('/', matchController.getMatches);
router.get('/:matchId', matchController.getMatchDetails);
router.get('/players/:playerId/stats', matchController.getPlayerStats);

module.exports = router;