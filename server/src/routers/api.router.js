const router = require('express').Router()

const tokenRouter = require('./token.router');
const authRouter = require('./auth.router');
const plansRouter = require('./plans.router'); 
const exerciseRouter = require('./exercises.router'); 

router.use('/tokens', tokenRouter);
router.use('/auth', authRouter);
router.use('/plans', plansRouter);
router.use('/exercise', exerciseRouter);

module.exports = router;