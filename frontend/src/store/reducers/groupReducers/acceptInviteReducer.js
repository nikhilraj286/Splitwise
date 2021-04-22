const initialState = {
    user: []
}

export const acceptInviteReducer = (state = initialState, action) => {
    // console.log(action.payload)
    switch (action.type) {
        case 'ACCEPTINVITE':
            return { ...state, user: action.payload }

        default:
            return state

    }
}