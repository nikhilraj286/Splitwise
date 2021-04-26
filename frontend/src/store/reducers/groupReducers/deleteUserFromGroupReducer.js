const initialState = {
    user: []
}

export const deleteUserFromGroupReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'DELETEUSERFROMGROUP':
            return { ...state, user: action.payload }

        default:
            return state

    }
}