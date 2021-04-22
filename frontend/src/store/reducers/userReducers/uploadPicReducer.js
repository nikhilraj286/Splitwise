const initialState = {
    user: []
}

export const uploadPicReducer = (state = initialState, action) => {
    // console.log(action.payload)
    switch (action.type) {
        case 'UPLOADPIC':
            return { ...state, user: action.payload }

        default:
            return state

    }
}