require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const mongoose = require('mongoose');

// Connect to MongoDB using the environment variable
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: process.env.MONGODB_DATABASE,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a schema for the form data
const formDataSchema = new mongoose.Schema({
  text: String,
  timestamp: Date,
});

const FormData = mongoose.model('FormData', formDataSchema);

app.post('/submit-form', async (req, res) => {
  try {
    const { text } = req.body;
    // Create a new document with the submitted data
    const formData = new FormData({
      text,
      timestamp: new Date(),
    });

    // Save the document to the database
    await formData.save();

    res.status(201).json({ message: 'Form data saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while saving the form data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});
