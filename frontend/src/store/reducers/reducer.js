import { combineReducers } from 'redux';
import { LoginReducer } from './loginReducer/loginReducer';

export default combineReducers({
    loginDetails:LoginReducer
})