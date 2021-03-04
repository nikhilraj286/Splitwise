const express=require('express');
const router = express.Router();

const loginRouter=require('./login/login');
const signUpRouter=require('./signUp/signup');

router.use('/login',loginRouter);
router.use('/signup',signUpRouter);

module.exports=router;
