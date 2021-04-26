const initialState = {
    user: []
}

export const GetUsersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GETUSERS':
            return { ...state, user: action.payload }

        default:
            return state

    }
}