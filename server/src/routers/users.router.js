const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { User } = require('../models');

router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const users = await User.findAll({
      where: {
        [Op.or]: [
          { username: { [Op.iLike]: `%${query}%` } },
          { email: { [Op.iLike]: `%${query}%` } },
          { gender: { [Op.iLike]: `%${query}%` } },
          { goal: { [Op.iLike]: `%${query}%` } },
          { weight: { [Op.iLike]: `%${query}%` } },
          { height: { [Op.iLike]: `%${query}%` } },
        ],
      },
      limit: 10, // Optional: limit the number of results
    });

    res.json(users);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
