const router = require('express').Router()

const tokenRouter = require('./token.router');
const authRouter = require('./auth.router');


router.use('/tokens', tokenRouter);
router.use('/auth', authRouter);

module.exports = router;