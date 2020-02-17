const express = require('express');

const db = require('../data/dbConfig.js');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const accounts = await db('accounts');
    res.status(200).json(accounts);
  }
  catch (err) {
    res.status(500).json({ message: 'Internal error', err })
  }
})

// Need an ID to get a specific account
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const account = await db('accounts').where('id', id)
    res.status(200).json(account)
  }
  catch (err) {
    res.status(500).json({ message: 'Internal error', err })
  }
})

// Need a body to post
router.post('/', async (req, res) => {
  const accountData = req.body;
  try {
    const account = await db('accounts').insert(accountData);
    res.status(201).json(account)
  }
  catch (err) {
    res.status(500).json({ message: 'Internal error', err })
  }
})

// Need an id to that specific item, also need a where other wise you'd be updating the whole thing
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await db('accounts').where({ id }).update(req.body)
    res.status(200).json(updated);
  }
  catch (err) {
    res.status(500).json({ message: 'Internal error', err })
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const removed = await db('accounts').where({ id }).del();
    res.status(200).json(removed);
  }
  catch (err) {
    res.status(500).json({ message: 'Internal error', err })
  }
})


module.exports = router;