const path = require('path');
const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/openai', require('./routes/openaiRoutes'));

app.listen(port, () => console.log(`Server started on port ${port}`));