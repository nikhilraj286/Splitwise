const initialState = {
    user : []
}

export const LoginReducer = (state = initialState, action)=> {
      switch(action.type){
          case 'LOGIN':
              return {...state,user: action.payload}
          
              default:
                  return state
  
      }
  }