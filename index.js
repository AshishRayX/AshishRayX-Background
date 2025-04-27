const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
    const filePath = path.join(__dirname, 'links.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileContent);

    let source = data.background;
    let type = 'auto';

    // Detect platform and set type
    if (source.includes('youtube.com') || source.includes('youtu.be')) {
        type = 'youtube';
    } else if (source.includes('vimeo.com')) {
        type = 'vimeo';
    } else if (source.includes('twitch.tv') || source.includes('twitch.tv/videos') || source.includes('stream')) {
        type = 'livestream';
    } else if (source.match(/\.(mp4|webm|mov|avi|mkv|3gp)$/i) || source.includes('video')) {
        type = 'video';
    } else if (source.match(/\.(jpg|jpeg|png|gif|bmp|svg)$/i) || source.includes('image')) {
        type = 'image';
    } else if (source.includes('facebook.com') || source.includes('fb.watch')) {
        type = 'facebook';
    } else if (source.includes('wa.me') || source.includes('whatsapp.com')) {
        type = 'whatsapp';
    } else if (source.includes('t.me') || source.includes('telegram.org')) {
        type = 'telegram';
    } else if (source.includes('x.com') || source.includes('twitter.com')) {
        type = 'x';
    } else if (source.includes('instagram.com')) {
        type = 'instagram';
    } else if (source.includes('threads.net')) {
        type = 'threads';
    } else {
        type = 'unknown'; // Fallback for unsupported platforms
    }

    // Return the source and type
    res.status(200).json({ source, type });
};
