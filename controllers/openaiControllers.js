const OpenAI = require('openai');
const client = require('../connect-mongodb')
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

const generateImage = async (req, res) => {
 const {prompt, size, style} = req.body;
 const imageSize = size === 'small' ? '1024x1024' : size === 'medium' ? '1024x1792' : '1792x1024'
  try {
    const response = await openai.images.generate({ 
        prompt,
        model: "dall-e-3", 
        n: 1,
        size: imageSize,
        style: style,
    });
    image_url = response.data[0].url; 

    res.status(200).json({
      success: true,
      data:  image_url,
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
};

module.exports = { generateImage };

