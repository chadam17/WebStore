const express = require('express');
const app = express();

//Import articles from file.
const {infoArticles} = require('./datos/articles.js');

// Routers
const routerWear = require('./routers/wear.js');
app.use('/api/articles/wear', routerWear);

const routerSports = require('./routers/sports.js');
app.use('/api/articles/sports', routerSports);

// Routing
app.get('/', (req, res) => {
  res.send('WebStore Express Server');        
});

app.get('/api/articles', (req, res) => {
  res.json(infoArticles);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening at port: ${PORT}...`);      
});
