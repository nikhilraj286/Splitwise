import { combineReducers } from 'redux';
import { LoginReducer } from './loginReducer/loginReducer';
import { SignUpReducer } from './signupReducer/signupReducer'
import { GetUsersReducer } from './userReducers/getUsersReducer'
import { CreateGroupReducer } from './groupReducers/createGroupReducer'
import { settleupReducer } from './transactionReducers/settleupReducer'
import { getTransactionsReducer } from './transactionReducers/getTransactionsReducer'
import { getTransactionsForUserReducer } from './transactionReducers/getTransactionsForUserReducer';
import { getGroupsReducer } from './groupReducers/getGroupsReducer';
import { deleteUserFromGroupReducer } from './groupReducers/deleteUserFromGroupReducer';
import { newCommentReducer } from './expenseReducers/newCommentReducer';
import { deleteCommentReducer } from './expenseReducers/deleteCommentReducer';
import { newExpenseReducer } from './expenseReducers/newExpenseReducer';
import { getGroupDataReducer } from './groupReducers/getGroupDataReducer';
import { getTransactionsForGroupReducer } from './transactionReducers/getTransactionsForGroupReducer';
import { getExpensesForGroupReducer } from './expenseReducers/getExpensesForGroupReducer';
import { acceptInviteReducer } from './groupReducers/acceptInviteReducer';
import { getAllUsersNamesReducer } from './userReducers/getAllUserNamesReducer';
import { updateUserReducer } from './userReducers/updateUserReducer';
import { GetUserReducer } from './userReducers/getUserReducer';
import { uploadPicReducer } from './userReducers/uploadPicReducer';
// import { LogoutReducer } from './logoutReducer/logoutReducer'

const appReducer =  combineReducers({
    loginDetails:LoginReducer,
    signupDetails:SignUpReducer,
    getUsersDetails:GetUsersReducer,
    createGroupDetails: CreateGroupReducer,
    settleupDetails: settleupReducer,
    getTransactionsDetails: getTransactionsReducer,
    getGroupsDetails: getGroupsReducer,
    getTransactionsForUserDetails: getTransactionsForUserReducer,
    deleteUserFromGroupDetails: deleteUserFromGroupReducer,
    newCommentDetails: newCommentReducer,
    deleteCommentDetails: deleteCommentReducer,
    newExpenseDetails: newExpenseReducer,
    getGroupDataDetails: getGroupDataReducer,
    getTransactionsForGroupDetails: getTransactionsForGroupReducer,
    getExpensesForGroupDetails: getExpensesForGroupReducer,
    acceptInviteDetails: acceptInviteReducer,
    getAllUsersNamesDetails: getAllUsersNamesReducer,
    updateUserDetails: updateUserReducer,
    getUserDetails: GetUserReducer,
    uploadPicDetails: uploadPicReducer
    // logoutDetails:LogoutReducer
})

const RootReducer = (state, action)=> {
    if(action.type === 'LOGOUT'){
        state = []
    }
    return appReducer(state, action)
}

export default RootReducer;