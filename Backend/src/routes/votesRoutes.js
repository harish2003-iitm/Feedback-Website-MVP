const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentsController');

router.get('/', commentController.getAllComments);
router.get('/:commentId', commentController.getCommentById);
router.get('/feedback/:feedbackId', commentController.getCommentsByFeedbackId);
router.post('/', commentController.createComment);
router.put('/:commentId', commentController.updateComment);
router.delete('/:commentId', commentController.deleteComment);

module.exports = router;
