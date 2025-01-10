const router = require('express').Router();
const { User } = require('../../db/models');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');
const cookieConfig = require('../../configs/cookieConfig');
const {
  validateSignupData,
  validateSigninData,
} = require('../middlewares/validateData');

router.post('/signup', validateSignupData, async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        username,
        email,
        password: await bcrypt.hash(password, 10),
      },
    });

    if (!created) {
      return res.status(409).json({ message: 'Такой пользователь уже существует' });
    }

    const plainUser = user.get();
    delete plainUser.password;
    delete plainUser.createdAt;
    delete plainUser.updatedAt;

    const { accessToken, refreshToken } = generateToken({ user: plainUser });

    return res
      .status(201)
      .cookie('refreshToken', refreshToken, cookieConfig.refresh)
      .json({
        success: true,
        user: plainUser,
        accessToken,
      });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({
      success: false,
      message: 'Ошибка сервера, повторите попозже',
    });
  }
});

router.post('/signin', validateSigninData, async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Нет пользователей с такой почтой' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Неправильный пароль' });
    }

    const plainUser = user.get();
    delete plainUser.password;
    delete plainUser.createdAt;
    delete plainUser.updatedAt;

    const { accessToken, refreshToken } = generateToken({ user: plainUser });

    return res.cookie('refreshToken', refreshToken, cookieConfig.refresh).json({
      success: true,
      user: plainUser,
      accessToken,
    });
  } catch (error) {
    console.error('Signin error:', error);
    return res.status(500).json({
      success: false,
      message: 'Ошибка сервера, повторите попозже',
    });
  }
});

router.get('/signout', (req, res) => {
  try {
    res.clearCookie('refreshToken');
    return res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({
      success: false,
      message: 'Ошибка сервера, повторите попозже',
    });
  }
});

router.patch('/profile', async (req, res) => {
  const {
    password,
    age,
    username,
    email,
    gender,
    equipment,
    goal,
    id,
    weight,
    height,
  } = req.body;
  try {
    const result = await User.findByPk(id);
 
    const updatedUser = await result.update({
      password: await bcrypt.hash(password, 10),
      age,
      username,
      email,
      gender,
      equipment,
      goal,
      weight,
      height,
    });
    res.status(201).json(updatedUser);
 
  } catch (error) {
    console.error(error, 'initial server error');
    res.sendStatus(500);
  }
});

module.exports = router;
