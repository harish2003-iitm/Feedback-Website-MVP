const Votes = require('../models/Vote');

// Fetch all votes
exports.getAllVotes = async (req, res) => {
    try {
        const votes = await Votes.findAll();
        return res.status(200).send(votes);
    } catch (error) {
        return res.status(400).send(error);
    }
};

// Fetch votes for a specific feedbackId
exports.getVotesByFeedbackId = async (req, res) => {
    try {
        const { feedbackId } = req.params;
        const votes = await Votes.findAll({
            where: {
                feedbackId
            }
        });
        if(votes.length > 0) {
            return res.status(200).send(votes);
        } else {
            return res.status(404).send({ message: 'No votes found for this feedback.' });
        }
    } catch (error) {
        return res.status(400).send(error);
    }
};

// Add a vote
exports.addVote = async (req, res) => {
    try {
        const { feedbackId, userId, voteType } = req.body;
        // Check if the vote already exists
        const existingVote = await Votes.findOne({
            where: {
                feedbackId,
                userId,
            },
        });
        if (existingVote) {
            return res.status(409).send({ message: 'User has already voted on this feedback.' }); // 409 Conflict
        }
        const vote = await Votes.create({
            feedbackId,
            userId,
            voteType,
        });
        return res.status(201).send(vote);
    } catch (error) {
        return res.status(400).send(error);
    }
};

// Remove a vote
exports.removeVote = async (req, res) => {
    try {
        const { feedbackId, userId } = req.params;
        const vote = await Votes.findOne({
            where: {
                feedbackId,
                userId,
            },
        });

        if (vote) {
            await vote.destroy();
            return res.status(204).send(); // No content to send back on successful deletion
        } else {
            return res.status(404).send({ message: 'Vote not found.' });
        }
    } catch (error) {
        return res.status(400).send(error);
    }
};
