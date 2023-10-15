require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

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

const formDataSchema = new mongoose.Schema({
  text: String,
  posted: Boolean,
  timestamp: Date,
});

const FormData = mongoose.model('FormData', formDataSchema);

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
  timestamps: true
});

const Admin = mongoose.model('Admin', ModelSchema);

// Middleware for user authentication
const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "You must be logged in" });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const { _id } = payload;
    Admin.findById(_id).then(userData => {
      req.user = userData;
      next();
    });
  });
};

app.get('/api/get/form', async (req, res) => {
  try {
    const forms = await FormData.find({ posted: false });
    res.status(200).json({ forms });
  } catch (error) {
    console.error('Error fetching form data:', error);
    res.status(500).json({ error: 'An error occurred while fetching the form data' });
  }
});

app.put('/api/update/form/:id', async (req, res) => {
  try {
    const formId = req.params.id;
    const updatedForm = await FormData.findByIdAndUpdate(formId, { posted: true }, { new: true });

    if (!updatedForm) {
      return res.status(404).json({ error: 'Form not found' });
    }

    res.status(200).json(updatedForm);
  } catch (error) {
    console.error('Error updating form data:', error);
    res.status(500).json({ error: 'An error occurred while updating form data' });
  }
});

app.post('/create/admin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const isFound = await Admin.find({ email: email });

    if (isFound.length > 0) {
      res.status(400).json({ message: "User already exists with this email." });
    } else {
      const user = new Admin({ email, password });
      await user.save();
      console.log(user);
      res.status(201).json({ message: "Thanks for signing up", user });
    }
  } catch (error) {
    console.error('Error creating admin:', error);
    res.status(500).json({ error: 'An error occurred while creating the admin' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});
