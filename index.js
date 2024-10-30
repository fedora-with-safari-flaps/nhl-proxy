const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000; // Use Render's PORT or default to 3000

// Middleware to parse JSON requests
app.use(express.json());

// Proxy endpoint to handle NHL API requests
app.get('/proxy/nhl-schedule', async (req, res) => {
  try {
    // Construct the NHL API URL dynamically based on query parameters
    const team = req.query.team || 'NSH'; // Default to NSH (Nashville Predators)
    const url = `https://api-web.nhle.com/v1/club-schedule/${team}/week/now`;
    
    const response = await axios.get(url);
    res.json(response.data); // Forward the response from the NHL API
  } catch (error) {
    console.error('Proxy request failed:', error);
    res.status(500).json({ error: 'Proxy request failed' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
