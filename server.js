const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = 'AIzaSyAgZPiJsbjm05rTMCr8owaDpvywbq9O5w8'; // Tera API key

app.post('/career', async (req, res) => {
    const { grade, interest } = req.body;

    try {
        const response = await axios.post(
            'https://generativelanguage.googleapis.com/v1beta2/models/chat-bison-001:generateMessage',
            {
                prompt: {
                    messages: [
                        {
                            role: "user",
                            content: `Suggest career options for a ${grade} student interested in ${interest}. Include skills, free learning resources, and a motivational quote.`
                        }
                    ]
                }
            },
            {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        res.json(response.data);
    } catch (err) {
        console.error(err.response?.data || err.message);
        res.status(500).send("Error generating career advice.");
    }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));

