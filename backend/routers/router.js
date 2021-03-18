const express=require('express');
const router = express.Router();

const loginRouter=require('./login/login');
const signUpRouter=require('./signUp/signup');
const groupRouter=require('./group/group')
const queryRouter=require('./query')
const expenseRouter=require('./expense/expense')


router.use('/login', loginRouter);
router.use('/signup', signUpRouter);
router.use('/group', groupRouter)
router.use('/query', queryRouter);
router.use('/expense', expenseRouter)

module.exports=router;
