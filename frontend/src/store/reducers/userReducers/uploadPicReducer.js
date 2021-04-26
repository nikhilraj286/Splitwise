const initialState = {
    user: []
}

export const uploadPicReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPLOADPIC':
            return { ...state, user: action.payload }

        default:
            return state

    }
}