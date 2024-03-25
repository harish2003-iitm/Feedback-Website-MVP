const express = require('express');
const userController = require('./src/controllers/userController');
const router = express.Router();

// Define the routes for Users
router.get('/', userController.getAllUsers); // Get all users
router.get('/:id', userController.getUserById); // Get a single user by ID
router.post('/', userController.createUser); // Create a new user
router.put('/:id', userController.updateUser); // Update an existing user
router.delete('/:id', userController.deleteUser); // Delete a user

module.exports = router;
