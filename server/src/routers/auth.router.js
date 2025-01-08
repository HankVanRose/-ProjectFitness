const router = require('express').Router();
const { User } = require('../../db/models');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');
const cookieConfig = require('../../configs/cookieConfig');

router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!(username && email && password)) {
      return res
        .status(400)
        .json({ message: 'Please provide name, email and a password' });
    }

    const [user, isCreated] = await User.findOrCreate({
      where: { email },
      defaults: {
        username,
        email,
        password: await bcrypt.hash(password, 10),
      },
    });

    if (!isCreated) {
      return res
        .status(400)
        .json({ message: `User with email ${email} already exists.` });
    }

    const plainUser = user.get({ plain: true });
    delete plainUser.password;

    const { accessToken, refreshToken } = generateToken({ user: plainUser });

    res
      .cookie('refreshToken', refreshToken, cookieConfig.refresh)
      .json({ user: plainUser, accessToken });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({
        message: `User with email - ${email} is not defined.`,
      });
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    } else {
      const plainUser = user.get({ plain: true });
      delete plainUser.password;

      const { accessToken, refreshToken } = generateToken({ user: plainUser });

      res
        .cookie('refreshToken', refreshToken, cookieConfig.refresh)
        .json({ user: plainUser, accessToken });
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.get('/signout', (req, res) => {
  try {
    res.clearCookie('refreshToken').sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

router.patch('/profile', async (req, res) => {
  const { password, age, username, email, gender, equipment, goal, id, weight, height} =
    req.body;
  try {
    const result = await User.findByPk(id);
    const updatedUser = await result.update({password: await bcrypt.hash(password, 10), age, username, email, gender, equipment, goal, weight, height})
    res.status(200).json(updatedUser)
  } catch (error) {
    console.error(error, 'initial server error');
    res.sendStatus(500)
  }
});

module.exports = router;
