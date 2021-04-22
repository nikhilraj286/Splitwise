const initialState = {
    user: []
}

export const GetUserReducer = (state = initialState, action) => {
    // console.log(action.payload)
    switch (action.type) {
        case 'GETUSER':
            return { ...state, user: action.payload }

        default:
            return state

    }
}