const initialState = {
    user: []
}

export const getAllUsersNamesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GETALLUSERNAMES':
            return { ...state, user: action.payload }

        default:
            return state

    }
}