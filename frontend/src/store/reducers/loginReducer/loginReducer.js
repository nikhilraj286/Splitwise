const initialState = {
    user : []
}

export const LoginReducer = (state = initialState, action)=> {
    // console.log(action.payload)
      switch(action.type){
          case 'LOGIN':
              return {...state,user: action.payload}
          
              default:
                  return state
  
      }
  }