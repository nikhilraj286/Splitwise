const initialState = {
    user: []
}

export const updateUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATEUSER':
            return { ...state, user: action.payload }

        default:
            return state

    }
}