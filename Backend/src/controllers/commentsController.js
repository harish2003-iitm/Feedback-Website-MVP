const Comment = require('../models/Comment');

exports.getAllComments = async (req, res) => {
    try {
        const comments = await Comment.findAll();
        res.json(comments);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getCommentById = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            return res.status(404).send('Comment not found');
        }
        res.json(comment);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getCommentsByFeedbackId = async (req, res) => {
    try {
        const comments = await Comment.findByFeedbackId(req.params.feedbackId);
        res.json(comments);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.createComment = async (req, res) => {
    try {
        const newComment = await Comment.create(req.body);
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateComment = async (req, res) => {
    try {
        const updatedComment = await Comment.update(req.params.commentId, req.body);
        if (!updatedComment) {
            return res.status(404).send('Comment not found');
        }
        res.json(updatedComment);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteComment = async (req, res) => {
    try {
        const deleteCount = await Comment.delete(req.params.commentId);
        if (deleteCount === 0) {
            return res.status(404).send('Comment not found');
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
};
