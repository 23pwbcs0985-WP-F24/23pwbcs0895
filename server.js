const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');

dotenv.config();
console.log('Mongo URI:', process.env.MONGO_URI);


connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());


app.use('/api', authRoutes);


app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

const PORT = process.env.PORT || 5000;


if (process.env.VERCEL === 'true') {
 
  module.exports = app;
} else {

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
