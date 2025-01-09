const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');

dotenv.config();
console.log('Mongo URI:', process.env.MONGO_URI);

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', authRoutes);

// Handle 404 errors for undefined routes
app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

// Export app for Vercel or start server locally
const PORT = process.env.PORT || 5000;

if (process.env.VERCEL === 'true') {
  module.exports = app; // Export app for Vercel
} else {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
