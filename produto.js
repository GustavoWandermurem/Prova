const express = require('express');
const pool = require('../models/produto');
const router = express.Router();


let users =[]
let produto =[]

// Criar um novo produto
router.post('/produtos', (req, res) => {
  const { nome, descricao, preco } = req.body;

  pool.query(
    'INSERT INTO produtos (nome, descricao, preco) VALUES (?, ?, ?)',
    [nome, descricao, preco],
    (err, result) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      res.status(201).json({ id: result.insertId, nome, descricao, preco });
    }
  );
});

// Listar todos os produtos
router.get('/produtos', (req, res) => {
  pool.query('SELECT * FROM produtos', (err, results) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    res.status(200).json(results);
  });
});

module.exports = router;
