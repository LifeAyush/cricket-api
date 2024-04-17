const express = require('express');
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/signup', adminController.registerAdmin);
router.post('/login', adminController.loginAdmin);
router.post('/matches', auth, adminController.createMatch);
router.post('/teams/:teamId/squad', auth, adminController.addPlayerToSquad);

module.exports = router;