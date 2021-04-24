const express=require('express');
const router = express.Router();

const userAuthRouter = require('./userAuthAPI');
const groupRouter = require('./groupAPI')
const userRouter = require('./userAPI')
const expenseRouter = require('./expenseAPI')
const transactionRouter = require('./transactionAPI')
const imageRouter = require('./imageAPI')

router.use('/userAuth', userAuthRouter)
router.use('/group', groupRouter)
router.use('/user', userRouter)
router.use('/expense', expenseRouter)
router.use('/transaction', transactionRouter)
router.use('/image', imageRouter)

module.exports = router