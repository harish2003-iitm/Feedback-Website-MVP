const express = require('express');
const feedbackCategoryController = require('../controllers/feedbackCategoryController');
const router = express.Router();

router.get('/', feedbackCategoryController.getAllCategories);
router.get('/:CategoryID', feedbackCategoryController.getCategoryById);
router.post('/', feedbackCategoryController.createCategory);
router.put('/:CategoryID', feedbackCategoryController.updateCategory);
router.delete('/:CategoryID', feedbackCategoryController.deleteCategory);

module.exports = router;
