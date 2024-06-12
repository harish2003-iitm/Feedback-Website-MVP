const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import routes
const app = express();
const userRoutes = require('./userRoutes'); 
const feedbackRoutes = require('./src/routes/feedbackRoutes');
const commentsRoutes = require('./src/routes/commentsRoutes'); 
const votesRoutes = require('./src/routes/votesRoutes'); 
const feedbackCategoryRoutes = require('./src/routes/feedbackCategoryRoutes'); 
const responseRoutes = require('./src/routes/responseRoutes');

// Middleware
app.use(cors()); // Handle CORS
app.use(bodyParser.json()); // Parse JSON bodies

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/api/votes', votesRoutes);
app.use('/api/feedbackCategories', feedbackCategoryRoutes);
app.use('/api/responses', responseRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
