const express = require('express');
const responseController = require('../controllers/responseController');
const router = express.Router();

router.get('/', responseController.getAllResponses);
router.get('/feedback/:feedbackId', responseController.getResponsesByFeedbackId);
router.post('/', responseController.createResponse);
router.put('/:id', responseController.updateResponse);
router.delete('/:id', responseController.deleteResponse);

module.exports = router;
