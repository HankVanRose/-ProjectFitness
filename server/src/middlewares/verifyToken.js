const jwt = require('jsonwebtoken');

const verifyRefreshToken = (req, res, next) => {
  try {
    const { refreshToken } = req.cookies; // достаем по ключу рефреш токен
    const { user } = jwt.verify(refreshToken, process.env.SECRET_REFRESH_TOKEN);
    res.locals.user = user;
    next();
  } catch (error) {
    console.log(error, 'Invalid refresh token');
    res.sendStatus(401);
  }
};

const verifyAccessToken = (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.split(' ')[1];
    const { user } = jwt.verify(accessToken, process.env.SECRET_ACCESS_TOKEN);
    res.locals.user = user;
    next();
  } catch (error) {
    console.log(error, 'Invalid access token');
    res.sendStatus(401);
  }
};

module.exports = { verifyRefreshToken, verifyAccessToken };