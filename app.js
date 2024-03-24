const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import routes
const app = express();
const userRoutes = require('./Backend/src/routes/userRoutes'); 
const feedbackRoutes = require('./Backend/src/routes/feedbackRoutes');
const commentsRoutes = require('./Backend/src/routes/commentsRoutes'); 
const votesRoutes = require('./Backend/src/routes/votesRoutes'); 

// Middleware
app.use(cors()); // Handle CORS
app.use(bodyParser.json()); // Parse JSON bodies

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/api/votes', votesRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});