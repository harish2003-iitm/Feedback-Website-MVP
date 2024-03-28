const Response = require('../models/Response');

exports.getAllResponses = async (req, res) => {
    try {
        const responses = await Response.findAll();
        res.json(responses);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getResponsesByFeedbackId = async (req, res) => {
    try {
        const responses = await Response.findByFeedbackId(req.params.feedbackId);
        res.json(responses);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.createResponse = async (req, res) => {
    try {
        const response = await Response.create(req.body);
        res.status(201).json(response);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateResponse = async (req, res) => {
    try {
        const response = await Response.update(req.params.id, req.body);
        if (!response) return res.status(404).send('Response not found');
        res.json(response);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteResponse = async (req, res) => {
    try {
        const count = await Response.delete(req.params.id);
        if (count === 0) return res.status(404).send('Response not found');
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
};
