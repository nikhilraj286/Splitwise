const express=require('express');
const router = express.Router();

const loginRouter=require('./login/login');
const signUpRouter=require('./signUp/signup');
const queryRouter=require('./query')

router.use('/login',loginRouter);
router.use('/signup',signUpRouter);
router.use('/query', queryRouter);

module.exports=router;
