const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import routes
const userRoutes = require('./src/routes/userRoutes'); // Adjust the path as necessary
const feedbackRoutes = require('./src/routes/feedbackRoutes'); // Adjust as necessary
const commentsRoutes = require('./src/routes/commentsRoutes'); // Adjust as necessary
const votesRoutes = require('./src/routes/votesRoutes'); // Adjust as necessary

const app = express();

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
