// File: api/submit.js
const fetch = require('node-fetch');

export default async (req, res) => {
    const { website } = req.body;

    if (!website) {
        return res.status(400).json({ message: 'Website URL is required.' });
    }

    const owner = 'Evan0234'; 
    const repo = 'bot.zeeps.me'; 
    const githubToken = process.env.G_TOKEN; // Ensure this is set in Vercel Environment Variables

    try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/actions/workflows/bot.yml/dispatches`, {
            method: 'POST',
            headers: {
                'Authorization': `token ${githubToken}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ref: 'main', // or the branch you want to use
                inputs: { website }
            })
        });

        if (response.ok) {
            res.status(200).json({ message: 'Website submitted successfully. The bot is checking it!' });
        } else {
            const error = await response.json();
            res.status(response.status).json({ message: `Failed to trigger workflow: ${error.message}` });
        }
    } catch (error) {
        res.status(500).json({ message: `Server error: ${error.message}` });
    }
};
