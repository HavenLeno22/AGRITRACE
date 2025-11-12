const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend connected successfully 🚀');
});



let users = {
    'farmer@agritrace.io': { name: 'Maria Rodriguez', password: 'password123', type: 'farmer' },
    'consumer@agritrace.io': { name: 'Anil Kumar', password: 'password123', type: 'consumer' },
    'middleman@agritrace.io': { name: 'Fresh Haul Inc.', password: 'password123', type: 'middleman' },
};

app.post('/api/login', (req, res) => {
    const { credential, password, userType } = req.body;
    const user = users[credential];
    if (user && user.password === password && user.type === userType) {
        res.status(200).json({ success: true, message: `Welcome back, ${user.name}!`, user: { name: user.name, email: credential, type: user.type } });
    } else {
        res.status(401).json({ success: false, message: "Invalid credentials for this role." });
    }
});

app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    if (!GEMINI_API_KEY || GEMINI_API_KEY === "PASTE_YOUR_GEMINI_API_KEY_HERE") {
        return res.status(500).json({ error: "API key not configured on the server." });
    }
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${GEMINI_API_KEY}`;
    try {
        const fetch = await import('node-fetch');
        const response = await fetch.default(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: userMessage }] }] })
        });
        const result = await response.json();
        res.status(200).json({ reply: result.candidates[0].content.parts[0].text });
    } catch (error) {
        res.status(500).json({ error: "Failed to communicate with the AI assistant." });
    }
});
app.get('/', (req, res) => {
  res.send('Backend is alive! 🚀');
});

app.get('/test', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});


app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
});


