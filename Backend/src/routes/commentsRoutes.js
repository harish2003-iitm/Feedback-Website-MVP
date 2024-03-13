const express = require('express');
const commentsController = require('../controllers/commentsController');
const router = express.Router();

// Define the routes for Comments
router.get('/', commentsController.getAllComments);
router.get('/:id', commentsController.getCommentById);
router.post('/', commentsController.createComment);
router.delete('/:id', commentsController.deleteComment);

module.exports = router;
