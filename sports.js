const express = require('express');

const {sports} = require('../datos/articles.js').infoArticles;

const routerSports = express.Router();

routerSports.use(express.json());

routerSports.get('/', (req, res) => {
  res.json(sports);
});
  
routerSports.get('/:ranking', (req, res) => {
  const ranking = req.params.ranking;
  const resultados = sports.filter(article => article.ranking === ranking);
  
  if (resultados.length === 0) {
    return res.status(404).send(`Not found articles of ranking: ${ranking}`);
  }
  res.json(resultados);
});

routerSports.post('/', (req, res) => {
  let newSport = req.body;
  sports.push(newSport);
  res.json(sports);
});

//Finally, we export the sport articles to be used in main script.
module.exports = routerSports;
