const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

// Read links.json
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
  const extension = background.split('.').pop().toLowerCase();
  const type = ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension) ? 'image' : 'video';
  
  // Automatically add domain
  const domain = 'https://ashishrayx-background.vercel.app'; // apna domain
  const fullSource = background.startsWith('http') ? background : domain + background;

  res.status(200).json({
    source: fullSource,
    type: type
  });
});

// Export for Vercel
module.exports = app;
