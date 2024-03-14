const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await User.update(req.params.id, req.body);
        if (!updatedUser) {
            return res.status(404).send('User not found');
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const result = await User.delete(req.params.id);
        if (!result) {
            return res.status(404).send('User not found');
        }
        res.status(204).send(); // No content to send back
    } catch (error) {
        res.status(500).send(error.message);
    }
};
