const router = require('express').Router();
const { User } = require('../../db/models');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');
const cookieConfig = require('../../configs/cookieConfig');
const {
  validateSignupData,
  validateSigninData,
} = require('../middlewares/validateData');
const nodemailer = require('nodemailer');

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
      return res
        .status(409)
        .json({ message: 'Такой пользователь уже существует' });
    }

    const plainUser = user.get();
    delete plainUser.password;
    delete plainUser.createdAt;
    delete plainUser.updatedAt;

    const { accessToken, refreshToken } = generateToken({ user: plainUser });

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'vanroseaxl1@gmail.com',
        pass: 'njja kzsp nsya xbuv',
      },
    });

    const mailOptions = {
      from: '👻 BEFIT 👻 vanroseaxl1@gmail.com',
      to: email,
      subject: 'Добро пожаловать!',
      html: `
        <h1>Привет, ${username} ❤️!</h1>
        <p>Спасибо за регистрацию на нашем сайте. Успехов в преображении🔥.</p>
        <p>Выбери свой план тренировок на <a href="http://localhost:5173/plans">Планы тренировок</a>. 
        
        </p>
        <br/>
         <p>С Уважением команда <a href="http://localhost:5173">BE FIT</a></p>
      `,
    };

    await transporter.sendMail(mailOptions);

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
      return res.status(403).json({
        success: false,
        message: 'Нет пользователей с такой почтой',
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(403).json({
        success: false,
        message: 'Неправильный пароль',
      });
    }

    if (user.isBlocked) {
      return res.status(403).json({
        success: false,
        message: 'Пользователь заблокирован',
      });
    }

    const plainUser = user.get();
    delete plainUser.password;
    delete plainUser.createdAt;
    delete plainUser.updatedAt;

    const { accessToken, refreshToken } = generateToken({ user: plainUser });

    return res.status(200).cookie('refreshToken', refreshToken, cookieConfig.refresh).json({
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
  const { id, email, password, ...otherData } = req.body;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    if (email) {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser && existingUser.id !== id) {
        return res
          .status(400)
          .json({ message: 'Пользователь с таким email уже зарегистрирован' });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Некорректный формат email' });
      }
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      otherData.password = hashedPassword;
    }

    await user.update({
      ...otherData,
      ...(email && { email }),
      ...(password && { password: otherData.password }),
    });
    const updatedUser = user.toJSON();
    delete updatedUser.password;

    const { accessToken, refreshToken } = generateToken({ user: updatedUser });

    return res
      .status(200)
      .cookie('refreshToken', refreshToken, cookieConfig.refresh)
      .json({
        success: true,
        user: updatedUser,
        accessToken,
      });
  } catch (error) {
    console.error(error, 'Ошибка на сервере при обновлении профиля');
    res.sendStatus(500);
  }
});

router.post('/check-password', async (req, res) => {
  const { userId, password } = req.body;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    res.json({ isMatch });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка проверки пароля на сервере' });
  }
});

module.exports = router;
