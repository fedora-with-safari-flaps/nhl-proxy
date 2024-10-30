const express = require('express');
const axios = require('axios');
const app = express();

app.get('/', async (req, res) => {
  const apiUrl = req.query.url; // Capture the NHL API URL from the query parameter
  
  if (!apiUrl) {
    return res.status(400).json({ error: "No API URL provided." });
  }

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Accept': 'application/json'
      }
    });

    // Forward the response data back to the client
    res.json(response.data);
  } catch (error) {
    console.error("Error forwarding the request:", error.message);
    res.status(500).json({ error: "Proxy request failed" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Proxy server running on port ${port}`));
