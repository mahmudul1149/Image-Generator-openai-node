const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const OpenAI = require('openai');
const client = require('./connect-mongodb');

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/openai/generateimage', async (req, res) => {
    const { prompt, size, style } = req.body;
    const imageSize = size === 'small' ? '1024x1024' : size === 'medium' ? '1024x1792' : '1792x1024';
  
    try {
      const response = await openai.images.generate(
        {
          prompt,
          model: 'dall-e-3',
          n: 1,
          size: imageSize,
          style: style,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
        }
      );
  
      const imageUrl = response.data[0].url;
  
      res.status(200).json({
        success: true,
        data: imageUrl,
      });
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
  
      res.status(400).json({
        success: false,
        error: 'The image could not be generated',
      });
    }
  });

app.listen(port, () => console.log(`Server started on port ${port}`));
