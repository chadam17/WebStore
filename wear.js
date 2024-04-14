const express = require('express');

const {wear} = require('../datos/articles.js').infoArticles;

const routerWear = express.Router();

// Process request body.
routerWear.use(express.json());

routerWear.get('/', (req, res) => {
  res.json(wear);
});
  
routerWear.get('/:color', (req, res) => {
  const color = req.params.color;
  const resultados = wear.filter(type => type.color === color);
  
  if (resultados.length === 0) {
    return res.status(404).send(`Not found articles of color: ${color}.`);
  } 
  
  if (req.query.ordenar === 'sales') {
    return res.send(resultados.sort((a, b) => b.sales - a.sales));
  }
  
  res.json(resultados);
});
  
routerWear.get('/:type/:color', (req, res) => {
  const type = req.params.type;
  const color = req.params.color;
  
  const resultados = wear.filter(article => article.type === type && article.color === color);
  
  if (resultados.length === 0) {
    return res.status(204).send(`Not found ${type} clothes of color ${color}`);
  }
  res.json(resultados);
});

routerWear.post('/', (req, res) => {
  let newArticle = req.body;
  wear.push(newArticle);
  res.json(wear);
});

routerWear.put('/:id', (req, res) => {
  const updatedItem = req.body;
  const id = req.params.id;

  const index = wear.findIndex(article => article.id == id);

  if (index >= 0) {
    wear[index] = updatedItem;
  }
  res.json(wear);
});

routerWear.patch('/:id', (req, res) => {
  const newInfo = req.body;
  const id = req.params.id;

  const index = wear.findIndex(article => article.id == id);

  if (index >= 0) {
    const modifiedItem = wear[index];
    Object.assign(modifiedItem, newInfo);
  }
  res.json(wear);
});

routerWear.delete('/:id', (req, res) => {
  const id = req.params.id;
  const index = wear.findIndex(article => article.id == id);

  if (index >= 0) {
    wear.splice(index, 1);
  }
  res.json(wear);
});

//Finally, we export the clothes to be used in main script.
module.exports = routerWear;
