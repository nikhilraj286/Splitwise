const initialState = {
    user : []
}

export const SignUpReducer = (state = initialState, action)=> {
      switch(action.type){
          case 'SIGNUP':
              return {...state,user: action.payload}
          default:
              return state
  
      }
  }