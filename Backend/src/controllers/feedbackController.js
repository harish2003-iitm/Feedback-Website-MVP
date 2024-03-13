const Feedback = require('../models/Feedback');

exports.getAllFeedback = async (req, res) => {
    try {
        const feedbacks = await Feedback.findAll();
        res.json(feedbacks);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getFeedbackById = async (req, res) => {
    try {
        const feedback = await Feedback.findById(req.params.id);
        if (!feedback) {
            return res.status(404).send('Feedback not found');
        }
        res.json(feedback);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.createFeedback = async (req, res) => {
    try {
        const newFeedback = await Feedback.create(req.body);
        res.status(201).json(newFeedback);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateFeedback = async (req, res) => {
    try {
        const updatedFeedback = await Feedback.update(req.params.id, req.body);
        res.json(updatedFeedback);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteFeedback = async (req, res) => {
    try {
        await Feedback.delete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
};
