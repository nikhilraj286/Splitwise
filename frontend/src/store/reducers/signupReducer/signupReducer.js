export const SignUpReducer = (state = [], action)=> {
    console.log(action.payload)
      switch(action.type){
          case 'LOGIN':
              return {...state,user: action.payload}
          
              default:
                  return state
  
      }
  }