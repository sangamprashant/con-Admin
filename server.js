require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const path =require ("path")

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
  jwt.verify(token, process.env.AUTH_SECRET, (err, payload) => {
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

app.get('/api/get/form',authMiddleware, async (req, res) => {
  try {
    const forms = await FormData.find({ posted: false });
    res.status(200).json({ forms });
  } catch (error) {
    console.error('Error fetching form data:', error);
    res.status(500).json({ error: 'An error occurred while fetching the form data' });
  }
});

app.put('/api/update/form/:id',authMiddleware, async (req, res) => {
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

//all ok but needed to be comented
// app.post('/create/admin',authMiddleware, async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const existingAdmin = await Admin.findOne({ email });
//     if (existingAdmin) {
//       return res.status(400).json({ message: 'User already exists with this email.' });
//     }
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);
//     const admin = new Admin({ email, password: hashedPassword });
//     await admin.save();
//     res.status(201).json({ message: 'Thanks for signing up', user: admin });
//   } catch (error) {
//     console.error('Error creating admin:', error);
//     res.status(500).json({ error: 'An error occurred while creating the admin' });
//   }
// });

app.post("/api/user/do/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    
    if (!admin) {
      return res.status(401).json({ message: "User not found. Authentication failed." });
    }
    
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect password. Authentication failed." });
    }

    // Generate a JSON Web Token (JWT) for the authenticated user
    const token = jwt.sign({ adminId: admin._id }, process.env.AUTH_SECRET);

    res.status(200).json({
      message: "Login successful",
      token: token,
      user: admin,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

//serving frontend
app.use(express.static(path.join(__dirname,"./frontend/build")))
app.get("*",(req,res)=>{
  res.sendFile(
    path.join(__dirname,"./frontend/build/index.html"),
    function (err){
      res.status(500).send(err)
    }
  )
})

app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});
