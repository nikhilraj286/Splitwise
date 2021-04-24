const express=require('express');
const router = express.Router();

const userAuthRouter=require('./userAuth');
const groupRouter = require('./group')
const userRouter = require('./user')
const transactionRouter = require('./transaction')
const expenseRouter = require('./expense')
const imageRouter = require('./image')

router.use('/login', userAuthRouter);
router.use('/signup', userAuthRouter);
router.use('/group', groupRouter)
router.use('/user', userRouter)
router.use('/transaction', transactionRouter)
router.use('/expense', expenseRouter)
router.use('/image', imageRouter)


module.exports=router;
