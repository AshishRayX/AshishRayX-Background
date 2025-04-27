const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to read links.json
const linksPath = path.join(__dirname, 'links.json');
let links = {};

try {
  if (fs.existsSync(linksPath)) {
    links = JSON.parse(fs.readFileSync(linksPath, 'utf8'));
  }
} catch (error) {
  console.error('Error reading links.json:', error);
}

app.get('/api', (req, res) => {
  const background = links.background || '';
  res.status(200).json({
    source: background,
    type: background.endsWith('.jpg') || background.endsWith('.png') ? 'image' : 'video'
  });
});

// Export for Vercel
module.exports = app;
