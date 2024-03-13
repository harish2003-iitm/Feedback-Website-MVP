const Vote = require('../models/Vote');

exports.getAllVotes = async (req, res) => {
    try {
        const votes = await Vote.findAll();
        res.json(votes);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.createVote = async (req, res) => {
    try {
        const newVote = await Vote.create(req.body);
        res.status(201).json(newVote);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteVote = async (req, res) => {
    try {
        await Vote.delete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
};
