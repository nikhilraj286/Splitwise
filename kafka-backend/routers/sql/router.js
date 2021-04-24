const express=require('express');
const router = express.Router();

const loginRouter=require('./login/login');
const signUpRouter=require('./signUp/signUp');
const groupRouter=require('./group/group')
const queryRouter=require('./query')
const expenseRouter=require('./expense/expense')
const transactionRouter=require('./transaction/transaction')

router.use('/login', loginRouter);
router.use('/signup', signUpRouter);
router.use('/group', groupRouter)
router.use('/query', queryRouter);
router.use('/expense', expenseRouter)
router.use('/transaction', transactionRouter)


module.exports=router;
