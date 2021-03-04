import { combineReducers } from 'redux';
import { LoginReducer } from './loginReducer/loginReducer';
import { SignUpReducer} from './signupReducer/signupReducer'

export default combineReducers({
    loginDetails:LoginReducer,
    signupDetails:SignUpReducer
})