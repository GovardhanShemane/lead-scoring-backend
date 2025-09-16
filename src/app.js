
const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const app = express();

app.use(express.json());
app.use('/api', apiRoutes);

// Root route 
app.get('/', (req, res) => {
  res.send('Lead Scoring Backend is running!');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

module.exports = app;
