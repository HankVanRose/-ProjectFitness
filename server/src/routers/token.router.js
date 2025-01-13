const router = require('express').Router();
const cookieConfig = require('../../configs/cookieConfig');  
const { verifyRefreshToken } = require('../middlewares/verifyToken');  
const generateToken = require('../utils/generateToken');  

router.get('/refresh', verifyRefreshToken, (req, res) => {
  try {
    const { user } = res.locals;
    const { accessToken, refreshToken } = generateToken({ user });
    console.log(user);

    res
      .cookie('refreshToken', refreshToken, cookieConfig.refresh)
      .json({ user: user, accessToken });
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

module.exports = router;