const express = require('express');
const feedbackCategoryController = require('../controllers/feedbackCategoryController');
const router = express.Router();

router.get('/', feedbackCategoryController.getAllCategories);
router.get('/:id', feedbackCategoryController.getCategoryById);
router.post('/', feedbackCategoryController.createCategory);
router.put('/:id', feedbackCategoryController.updateCategory);
router.delete('/:id', feedbackCategoryController.deleteCategory);

module.exports = router;
