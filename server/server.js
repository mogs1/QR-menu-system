const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const mongoURI = process.env.MONGODB_URI
const Port = process.env.PORT

const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/menu', menuRoutes);
app.use('/order', orderRoutes);

// Database Connection
mongoose
.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('MongoDB connection error:', error));

// Start Server
app.listen(Port, () => {
  console.log('Server running on http://localhost:5000');
});
