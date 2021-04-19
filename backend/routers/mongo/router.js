const express=require('express');
const router = express.Router();

const userAuthRouter=require('./userAuth');
const groupRouter = require('./group')
const userRouter = require('./user')
const transactionRouter = require('./transaction')

router.use('/login', userAuthRouter);
router.use('/signup', userAuthRouter);
router.use('/group', groupRouter)
router.use('/user', userRouter)
router.use('/transaction', transactionRouter)


module.exports=router;
