const initialState = {
    user : []
}

export const SignUpReducer = (state = initialState, action)=> {
    // console.log(action.payload)
      switch(action.type){
          case 'SIGNUP':
              return {...state,user: action.payload}
          default:
              return state
  
      }
  }