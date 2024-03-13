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
        const category = await FeedbackCategory.findById(req.params.id);
        if (!category) {
            return res.status(404).send('Feedback Category not found');
        }
        res.json(category);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
