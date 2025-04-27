const fs = require('fs');
const path = require('path');

const linksPath = path.join(__dirname, 'links.json');
let links = {};

try {
  console.log('Looking for links.json at:', linksPath); // Debugging
  if (fs.existsSync(linksPath)) {
    const data = fs.readFileSync(linksPath, 'utf8');
    console.log('Raw links.json content:', data); // Debugging
    links = JSON.parse(data);
    console.log('Parsed links:', links); // Debugging
  } else {
    console.log('links.json not found at:', linksPath); // Debugging
    links = { background: '' }; // Fallback
  }
} catch (error) {
  console.log('Error reading or parsing links.json:', error); // Debugging
  links = { background: '' }; // Fallback
}

module.exports = async (req, res) => {
  const background = links.background || '';
  console.log('API response background:', background); // Debugging
  res.status(200).json({
    source: background,
    type: background.endsWith('.jpg') || background.endsWith('.png') ? 'image' : 'video'
  });
};
