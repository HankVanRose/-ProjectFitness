const { validateEmail, validatePassword } = require('./validators');

const validateSignupData = (req, res, next) => {
  const { username, email, password } = req.body;

  if (!(username?.trim() && email?.trim() && password?.trim())) {
    return res.status(400).json({ message: 'Заполните все поля!' });
  }

  if (!validateEmail(email)) {
    return res
      .status(400)
      .json({ message: 'Введите правильную электронную почту' });
  }

  if (!validatePassword(password)) {
    return res.status(400).json({
      message: 'Пароль должен быть не менее 8 символов',
    });
  }

  next();
};

const validateSigninData = (req, res, next) => {
  const { email, password } = req.body;

  if (!(email?.trim() && password?.trim())) {
    return res.status(400).json({ message: 'Заполните все поля!' });
  }

  next();
};

module.exports = { validateSigninData, validateSignupData };
