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
app.use(cors());
app.use(bodyParser.json());

// Use the auth routes
app.use('/api', authRoutes);

// Handle all other routes with 404 Not Found
app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
