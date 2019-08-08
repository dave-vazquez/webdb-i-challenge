const express = require('express');
const db = require('./data/dbConfig.js');

const server = express();
server.use(express.json());

server.get('/', async (req, res) => {
  try {
    let accounts = await db('accounts');

    res.status(200).json({
      success: true,
      accounts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error
    });
  }
});

server.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    let account = await db('accounts').where({ id });

    res.status(200).json({
      success: true,
      account
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error
    });
  }
});

server.post('/', async (req, res) => {
  const account = req.body;

  try {
    let rowsAffected = await db('accounts').insert(account);

    res.status(201).json({
      success: true,
      rowsAffected
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error
    });
  }
});

server.put('/:id', async (req, res) => {
  const { id } = req.params;
  const account = req.body;

  try {
    let rowsAffected = await db('accounts')
      .where({ id: 13 })
      .update({ budget: 99999 });

    res.status(200).json({
      success: true,
      rowsAffected
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error
    });
  }
});

server.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const rowsAffected = await db('accounts')
      .where({ id })
      .del();

    res.status(200).json({
      success: true,
      rowsAffected
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error
    });
  }
});

module.exports = server;
