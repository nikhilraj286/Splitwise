import { combineReducers } from 'redux';
import { LoginReducer } from './loginReducer/loginReducer';
import { SignUpReducer } from './signupReducer/signupReducer'
// import { LogoutReducer } from './logoutReducer/logoutReducer'

const appReducer =  combineReducers({
    loginDetails:LoginReducer,
    signupDetails:SignUpReducer,
    // logoutDetails:LogoutReducer
})

const RootReducer = (state, action)=> {
    if(action.type === 'LOGOUT'){
        state = []
    }
    return appReducer(state, action)
}

export default RootReducer;