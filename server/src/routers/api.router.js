const router = require('express').Router();

const tokenRouter = require('./token.router');
const authRouter = require('./auth.router');
const plansRouter = require('./plans.router');
const exerciseRouter = require('./exercises.router');
const sessionRouter = require('./session.router');
const daysRouter = require('./days.router');
const userRouter = require('./users.router');
const userdaysRouter = require('./userdays.router');
const downloadRouter = require('./download.router');
 

router.use('/tokens', tokenRouter);
router.use('/auth', authRouter);
router.use('/plans', plansRouter);
router.use('/exercise', exerciseRouter);
router.use('/session', sessionRouter);
router.use('/days', daysRouter);
router.use('/users', userRouter);
router.use('/userdays', userdaysRouter);
router.use('/download', downloadRouter);
 


module.exports = router;
