const express = require('express');
const feedbackCategoryController = require('../controllers/feedbackCategoryController');
const router = express.Router();

// Define the routes for FeedbackCategories
router.get('/', feedbackCategoryController.getAllCategories);
router.get('/:id', feedbackCategoryController.getCategoryById);

module.exports = router;
