export const LogoutReducer = (state = [], action)=> {
      switch(action.type){
        case 'LOGOUT':
            return {}
          
        default:
            return state
  
      }
  }