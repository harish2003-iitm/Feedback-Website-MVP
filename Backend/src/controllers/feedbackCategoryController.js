const FeedbackCategory = require('../models/FeedbackCategory');

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await FeedbackCategory.findAll();
        res.json(categories);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getCategoryById = async (req, res) => {
    try {
        const category = await FeedbackCategory.findById(req.params.CategoryID);
        if (!category) {
            return res.status(404).send('Category not found');
        }
        res.json(category);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.createCategory = async (req, res) => {
    try {
        const newCategory = await FeedbackCategory.create(req.body);
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const updatedCategory = await FeedbackCategory.update(req.params.CategoryID, req.body);
        if (!updatedCategory) {
            return res.status(404).send('Category not found');
        }
        res.json(updatedCategory);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        await FeedbackCategory.delete(req.params.CategoryID);
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
};
