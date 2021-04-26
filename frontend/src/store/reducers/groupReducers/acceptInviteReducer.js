const initialState = {
    user: []
}

export const acceptInviteReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ACCEPTINVITE':
            return { ...state, user: action.payload }

        default:
            return state

    }
}