const initialState = {
    user : []
}


export const LogoutReducer = (state = initialState, action)=> {
      switch(action.type){
        case 'LOGOUT':
            return []
          
        default:
            return state
  
      }
  }