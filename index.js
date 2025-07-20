const express = require('express');
const cors = require('cors');
const ytdlp = require('yt-dlp-exec');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/download', async (req, res) => {
    const { videoUrl } = req.body;
    if (!videoUrl) return res.status(400).json({ error: 'Missing video URL' });

    try {
        const result = await ytdlp(videoUrl, {
            dumpSingleJson: true,
            noWarnings: true,
            noCallHome: true,
        });

        const download = result?.url || result?.formats?.[0]?.url;
        if (!download) throw new Error("No downloadable video found");

        res.json({ download });
    } catch (err) {
        res.json({ error: '❌ No downloadable video found. Ensure it is public.' });
    }
});

app.listen(3000, () => console.log('✅ Server running on port 3000'));
