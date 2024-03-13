const express = require('express');
const userController = require('../controllers/userController'); // Adjust the path as necessary
const router = express.Router();

// Define the routes for Users
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
