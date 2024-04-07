const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();

// middleware
app.use(express.static('public'));

app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = "mongodb+srv://williamcarey94:william12345@cluster0.myy9im0.mongodb.net/";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => {
    console.log('MongoDB connected successfully');
    app.listen(3002); // Start the server after successful connection
  })
  .catch((err) => console.error('Error connecting to MongoDB:', err));


// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('profile'));
app.get('/product', requireAuth, (req, res) => res.render('product'));
app.use(authRoutes);
app.get('/', (req, res) => {
  // Your logic for handling requests to the root path
  res.send('http://localhost:3002');
});