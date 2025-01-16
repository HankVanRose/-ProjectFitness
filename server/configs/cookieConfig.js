const jwtConfig = require('./jwtConfig'); 

module.exports = {
  access: {
    maxAge: jwtConfig.access.expiresIn, // время жизни куки на основе токенов
    httpOnly: true, // доступ к куки только по http (с фронта по js доступ запрещен))
  },
  refresh: {
    maxAge: jwtConfig.refresh.expiresIn,
    httpOnly: true,
  },
};