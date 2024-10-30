const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to handle CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow all origins
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Proxy route
app.get('/proxy/nhl-schedule', async (req, res) => {
  const apiUrl = req.query.url; // Get the URL from the query parameters
  try {
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Proxy request failed' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Proxy server running on port ${port}`);
});
