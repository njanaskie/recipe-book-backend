const path = require('path');
const express = require('express');
const app = express();
require('dotenv').config({ path: '.env' });
const router = require('./routes/router')
const mongoose = require('mongoose');
const cors = require('cors');
const decodeIDToken = require('./middleware/authenticateToken');
const scraper = require('./scraper/scraper')
const publicPath = path.join(__dirname, 'client', 'web', 'public');
const port = process.env.PORT || 3001;

mongoose.connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true })
     .then(() => {
       console.log('Connected to database');
     })
     .catch((err) => {
       console.log('Error connecting to DB', err.message);
     });

// app.use(express.static(publicPath));
app.use(cors());
app.use(express.json());
app.use(decodeIDToken);

// scraper.fetchURL()

app.use('/api', router);

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(publicPath));

  app.get('*', (req, res) => {
      res.sendFile(path.join(publicPath, 'index.html'));
  });
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});