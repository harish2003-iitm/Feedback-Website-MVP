const express = require('express');
const votesController = require('../controllers/votesController');
const router = express.Router();

// Define the routes for Votes
router.get('/', votesController.getAllVotes);
router.post('/', votesController.createVote);
router.delete('/:id', votesController.deleteVote);

module.exports = router;
