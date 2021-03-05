import { combineReducers } from 'redux';
import { LoginReducer } from './loginReducer/loginReducer';
import { SignUpReducer } from './signupReducer/signupReducer'
import { LogoutReducer } from './logoutReducer/logoutReducer'

export default combineReducers({
    loginDetails:LoginReducer,
    signupDetails:SignUpReducer,
    logoutDetails:LogoutReducer
})