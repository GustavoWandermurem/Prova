const express = require('express');
const pool = require('../models/usuario');
const router = express.Router();

// Criar um novo usuário
router.post('/usuarios', (req, res) => {
  const { codigo,nome, email, senha, cpf } = req.body;
  
  pool.query(
    'INSERT INTO usuarios (nome, email, senha, cpf) VALUES (?, ?, ?)',
    [codigo, nome, email, senha, cpf],
    (err, result) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      res.status(201).json({ id: result.insertId, nome, email });
    }
  );
});

// Listar todos os usuários
router.get('/usuarios', (req, res) => {
  pool.query('SELECT * FROM usuarios', (err, results) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    res.status(200).json(results);
  });
});


module.exports = router;
