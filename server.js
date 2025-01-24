const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const stateRoutes = require('./routes/stateRoutes');
const districtRoutes = require('./routes/districtRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = 5000;

// Body Parser Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/state-district-db').then(() => {
    console.log('MongoDB connected');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

// Routes
app.use('/api/states', stateRoutes);
app.use('/api/districts', districtRoutes);

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
