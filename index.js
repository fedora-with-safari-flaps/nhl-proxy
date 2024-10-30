const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to handle JSON requests
app.use(express.json());

app.get('/render-api-endpoint', async (req, res) => {
  const apiURL = req.query.url; // Get the NHL API URL from the query parameter

  try {
    const response = await axios.get(apiURL);
    res.json(response.data); // Send back the data from NHL API
  } catch (error) {
    res.status(500).json({ error: 'Proxy request failed', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
