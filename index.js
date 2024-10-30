const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).json({ error: 'No URL specified.' });
  }

  try {
    // Make the request to the target NHL API URL
    const response = await axios.get(targetUrl);

    // Set CORS headers
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type');

    // Send the data back to Botpress
    res.json(response.data);
  } catch (error) {
    console.error('Error making API call:', error.message);
    res.status(500).json({ error: `API call failed: ${error.message}` });
  }
});

app.listen(port, () => {
  console.log(`Proxy server listening on port ${port}`);
});
