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
  posted:Boolean,
  timestamp: Date,
});

const FormData = mongoose.model('FormData', formDataSchema);

// Define a schema for hospital data
const ModelSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
}, {
  timestamps: true // This option adds "createdAt" and "updatedAt" fields
});
// Create a model for the hospital data using the schema
const Admin = mongoose.model('Admin', ModelSchema);

app.get('/api/get/form', async (req, res) => {
  try {
    const forms = await FormData.find({posted:false})

    res.status(201).json({ forms });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while saving the form data' });
  }
});

// PUT route to update the 'posted' status
app.put('/api/update/form/:id', async (req, res) => {
  try {
    const formId = req.params.id;
    const updatedForm = await FormData.findByIdAndUpdate(formId, { posted: true }, { new: true });

    if (!updatedForm) {
      return res.status(404).json({ error: 'Form not found' });
    }

    return res.json(updatedForm);
  } catch (error) {
    console.error('Error updating form data:', error);
    return res.status(500).json({ error: 'An error occurred while updating form data' });
  }
});

app.post('/create/admin', async (req, res) => {
  const { email, password } = req.body;
  const isFound = await Admin.find({ email: email });
  // console.log(isFound);

  if (isFound.length > 0) { // Check if any user was found
    res.json({ message: "User already exists with this email." });
    return;
  }

  const user = new Admin({
    email,
    password
  });

  await user.save();
  console.log(user);
  res.json({ message: "Thanks for signing up", user });
});


app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});
