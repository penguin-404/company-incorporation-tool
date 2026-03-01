const express = require('express');
const cors = require('cors');
const companyRoutes = require('./routes/company.routes');
const shareholderRoutes = require('./routes/shareholder.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/companies', companyRoutes);
app.use('/api/shareholders', shareholderRoutes);

// Health Check
app.get('/', (req, res) => res.send('API is running...'));

module.exports = app;