require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.API_KEY;

app.post('/chat', async (req, res)=>{
    const userMessage = req.body.message

    try{ 
        const response = await axios.post( "https://api.groq.com/openai/v1/chat/completions", 
    { 
        model: "llama-3.1-8b-instant",
        messages: [
    {
      role: "system",
      content: "You are a helpful assistant. Always give answers with headings and bullet points in a clean format."
    },
    {
      role: "user",
      content: userMessage
    }
  ]
    
}, 
{
    headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type" : "application/json"
    }
}
);
const reply = response.data.choices[0].message.content;
res.json({reply})

}catch(error){
    console.error(error.response ? error.response.data : error.message);
    res.status(500).send("Error Communicating with the AI")
}
})

app.listen(5000, ()=>{
    console.log("Server running on http://localhost:5000");
})


