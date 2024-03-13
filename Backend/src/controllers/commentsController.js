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
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).send('Comment not found');
        }
        res.json(comment);
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

exports.deleteComment = async (req, res) => {
    try {
        await Comment.delete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
};
